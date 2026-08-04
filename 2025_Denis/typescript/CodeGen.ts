import {
    integer_partition_function,
    integer_partitions_of_fix_length,
    integer_partitions_of_fix_length_with_constraint
} from "./Nof1/modules/numeric/integer_partition";
import {
    Nouns
} from "./Nof1/modules/Words/Nouns";
/*
    select
       att: a, b, c
       agg: c(x), c(y), c(z)
       groups: x, y, z
       from:
           select
             att: a, b, c
             agg: c(x), c(y), c(z)
             groups: x, y, z
             from:
                    select // HÄNDISCH!!!!!
                        att: a, b, c
                        agg: []
                        groups: []
                        from_ NULL
*/



class Aggregate {
    function: string;
    attribute: string;
    rename: string;
}

class Query {

    attributes: string[] = [];
    group_by: string[] = [];
    aggregates: Aggregate[] = [];

    from: Query;

    total_costs_CTE(): number {
        let total_costs = 0;

        if( this.from != null)
            total_costs = this.from.total_costs_CTE();

        total_costs += this.attributes.length + this.aggregates.length + this.group_by.length;

        return total_costs;
    }

    total_costs_pipe(): number {
        let total_costs = 0;

        if( this.from != null)
            total_costs = this.from.total_costs_CTE();

        if(this.aggregates.length == 0) {
            total_costs = this.attributes.length;
        } else {
            total_costs = this.group_by.length + this.aggregates.length;
        }

        return total_costs;
    }
}

function generate_innermost_queries(number_of_attributes: number) {
    let ret_query = new Query();
    ret_query.attributes = (new Nouns()).pull_n_random_words(number_of_attributes);
    return ret_query;
}

function generate_Queries(number_queries: number, total_costs: number) {
    let total_cost_partitions = integer_partitions_of_fix_length_with_constraint(number_queries, total_costs, (n) => n > 1);
    let result_queries = [];
    for(let p of total_cost_partitions) {
        let query_with_all_partitions = [];
        for(let costs_of_this_query of p) {
            let valid_partitions = [];
            let att_agg_groupBy_partitions = integer_partitions_of_fix_length(costs_of_this_query, 3);
            for(let att_agg_groupBy_partition of att_agg_groupBy_partitions) {
                // att_agg_groupBy_partition ist EIN DreiTupel
                let att = att_agg_groupBy_partition[0];
                let agg = att_agg_groupBy_partition[1];
                let group = att_agg_groupBy_partition[2];
                if(att +  agg > 0) {
                    valid_partitions.push(att_agg_groupBy_partition);
                }
            }
            if(valid_partitions.length > 0) {
                query_with_all_partitions.push(valid_partitions);
            }
        }
        result_queries.push(query_with_all_partitions);
    }

    return result_queries;
}

let q = generate_innermost_queries(5);


let p = generate_Queries(50, 5);
console.log("dummy")

