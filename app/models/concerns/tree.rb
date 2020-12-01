module Tree extend ActiveSupport::Concern

  def build_tree root_id
    edges       = get_edges(root_id).to_a
    @ids        = edges.pluck(:subcomponent_id) << root_id #get IDs of all components for price calculation.
    @components = get_components(@ids).group_by(&:id)
    create_tree(edges.uniq, root_id)
  end

  def get_edges id
    ComponentToComponent.join_recursive do |query|
      query
        .start_with(component_id: id) { select('0 depth') }
        .connect_by(subcomponent_id: :component_id)
        .where(product_id: self.id)
        .select(query.prior[:depth] + 1, start_with: false)
    end.order('depth ASC')
  end

  def create_tree edges, root_id
    adj_list         = get_adj_list(edges)
    tree             = self.attributes #product attrs.
    tree["cost"]     = get_price
    tree["children"] = [] << get_subtree(adj_list, root_id, nil, nil, {})
    return tree
  end

  def get_adj_list edges
    edges.pluck(:component_id, :subcomponent_id, :id).group_by {|e| e[0]}
  end
  
  #can be done iteratively if needed.
  def get_subtree adj_list, node, parent, edge_id, memo
    return memo[node] if memo[node] # avoiding repeated subtree creation.

    subtree              = {}
    subtree["name"]      = @components[node].first.name
    subtree["parent_id"] = parent
    subtree["edge_id"]   = edge_id
    subtree["child_id"]  = @components[node].first.id 
    subtree["children"]  = []

    edges = adj_list[node] # array of edges for current node.
    return subtree if edges.nil? #leaf

    edges.each do |e|
      child = e[1]
      _edge_id = e[2]
      subtree["children"] << get_subtree(adj_list, child, node, _edge_id, memo)
    end
    memo[node] = subtree #mamoize for later.
    subtree
  end

  def get_components ids
    Component.where(id: ids)
  end

  def get_price
    price          = 0
    uniq_ids       = @ids.uniq
    component_freq = get_frequency(@ids)

    uniq_ids.each do |id|
      price += @components[id].first.price * component_freq[id]
    end
    price
  end

  def get_frequency ids
    frequencies = Hash.new(0)
    ids.each{|key| frequencies[key] += 1}
    return frequencies
  end

  # CYCLE DETECTION
  def can_add_edge? current_id, candidate_id
    ancestors = get_ancestors(current_id).pluck(:component_id, :product_id)
    
    return true if ancestors.empty?
    
    ancestors = ancestors.group_by{|i| i[1]}[self.id]
      .flatten.uniq
    
    return false if ancestors.include?(candidate_id)
    return true
  end
  def get_ancestors id
    ComponentToComponent.join_recursive do |query|
      query.start_with(subcomponent_id: id)
        .connect_by(subcomponent_id: :component_id)
        .where(product_id: self.id)
    end
  end

end