module Tree extend ActiveSupport::Concern

  def build_tree id
    edges       = get_edges(id)
    uniq_edges  = edges.distinct
    @ids        = edges.pluck(:subcomponent_id) << id #get IDs of all components for price calculation.
    @components = get_components(@ids).group_by(&:id)
    create_tree(uniq_edges, id) #pass distinct edges only, to avoid duplication.
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
    adj_list           = get_adj_list(edges)
    tree               = self.attributes #product attrs.
    tree["cost"]      = get_price
    tree["children"] = [] << get_subtree(adj_list, root_id, nil, {})
    return tree
  end

  def get_adj_list edges
    edges.pluck(:component_id, :subcomponent_id).group_by {|e| e[0]}
  end
  
  #can be done iteratively if needed.
  def get_subtree adj_list, node, parent, memo
    return memo[node] if memo[node] # avoiding repeated subtree creation.

    subtree             = {}
    subtree["name"]     = @components[node].first.name
    subtree["key"]      = @components[node].first.name.parameterize
    subtree["parent"]   = parent
    subtree["id"]       = @components[node].first.id 
    subtree["children"] = []

    edges = adj_list[node] # array of edges for current node.
    return subtree if edges.nil?

    edges.each do |e|
      child = e[1]
      subtree["children"] << get_subtree(adj_list, child, node, memo)
    end
    memo[node] = subtree
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

end