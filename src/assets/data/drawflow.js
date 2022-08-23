const drawflowData = {
  drawflow: {
    Home: {
      data: {
        5: {
          id: 5,
          name: "Node2",
          data: { script: "(req,res) => {\n console.log(req);\n}" },
          class: "Node2",
          html: "Node2",
          typenode: "vue",
          inputs: {
            input_1: { connections: [{ node: "6", input: "output_1" }] },
          },
          outputs: {
            output_1: { connections: [] },
            output_2: { connections: [] },
          },
          pos_x: 1000,
          pos_y: 117,
        },
        6: {
          id: 6,
          name: "Node1",
          data: { url: "localhost/add", method: "post" },
          class: "Node1",
          html: "Node1",
          typenode: "vue",
          inputs: {},
          outputs: {
            output_1: { connections: [{ node: "5", output: "input_1" }] },
          },
          pos_x: 137,
          pos_y: 89,
        },
      },
    },
  },
};

export { drawflowData };
