// First, we must generate a JSON parser using:
//
//      lark-js json.lark -o json_parser.js
//
// Then we can run it with
//
//      node run_json_parser.js



const parser = get_parser({propagate_positions : true})//, tree_class:new MyTree()})

function print_token(input, token, indent)
{
    return "" //token.value
}

function print_tree(input, tree, indent)
{
    var text = new Array(indent + 1).join(' ') + tree.data + ":"
    text += "[" + tree._meta.start_pos + "-" + tree._meta.end_pos +"]:"
    text += input.slice(tree._meta.start_pos, tree._meta.end_pos).replace('\n', ' ')
    text += "\n"
    for (var i=0; i<tree.children.length; i++)
    {
        var child = tree.children[i];
        if (child instanceof Tree)
        {
            text += print_tree(input, child, indent+2)
        }
        if (child instanceof Token)
        {
            text += print_token(input, child, indent+2)
        }
    }
    return text
}

function create_token(input, token)
{
    block_json = {}
    block_json.type = 'token';
    block_json.fields = {}
    block_json.fields.VALUE = token.value;
    block_json.data = ''
    return block_json;
}

function create_tree(input, tree)
{
    var block_json = {}
    block_json.type = 'node'
    block_json.fields = {}
    block_json.fields.NAME = tree.data;
    block_json.data = ''
    block_json.inputs = {}
    block_json.inputs.CHILDS = {}
    block_json.data = input.slice(tree._meta.start_pos, tree._meta.end_pos)
    var connect = block_json.inputs.CHILDS;

    for (var i=0; i<tree.children.length; i++)
    {
        var child = tree.children[i];
        if (child instanceof Tree)
        {
            var child_json = create_tree(input, child)
            connect.block = child_json;
            child_json.next = {}
            connect = child_json.next;
        }
        if (child instanceof Token)
        {
            var token_json = create_token(input, child)
            connect.block = token_json;
        }
    }
    return block_json;
}

function test_json() {
    const text = `
    {     
        "empty_object" : {},
        "empty_array"  : [],
        "booleans"     : { "YES" : true, "NO" : false },
        "numbers"      : [ 0, 1, -2, 3.3, 4.4e5, 6.6e-7 ],
        "strings"      : [ "This", [ "And" , "That", "And a \\"b" ] ],
        "nothing"      : null
    }
    `
    var tree = parser.parse(text);
    console.log(print_tree(text, tree, 0));
    var blocks_json = create_tree(text, tree);
    return blocks_json

}


