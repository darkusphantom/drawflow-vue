const drawflowData = {
  drawflow: {
    Home: {
      data: {
        19: {
          id: 19,
          name: "Value",
          data: {
            script: "number19 = 6",
          },
          class: "Value",
          html: "Value",
          typenode: "vue",
          inputs: {},
          outputs: {
            output_1: {
              connections: [
                {
                  node: "20",
                  output: "input_1",
                },
                {
                  node: "20",
                  output: "input_2",
                },
              ],
            },
          },
          pos_x: 25,
          pos_y: 243,
          input: "6",
        },
        20: {
          id: 20,
          name: "Add",
          data: {
            total: 12,
            value_1: 6,
            value_2: 6,
            script:
              "\n      def calculate(operation):\n        a = 6\n        b = 6\n        value = 0\n\n        if operation == 'add': value = a+b\n        if operation == 'subs': value = a-b\n        if operation == 'mult': value = a*b\n        if operation == 'div': value = a/b\n        if operation == 'mod': value = a%b\n        if operation == 'pow': value = a**b\n\n\n      typeOperation = add\n\n      print(calculate(typeOperation))\n    ",
          },
          class: "Add",
          html: "Add",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "19",
                  input: "output_1",
                },
              ],
            },
            input_2: {
              connections: [
                {
                  node: "19",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [],
            },
          },
          pos_x: 360,
          pos_y: 198,
        },
      },
    },
  },
};
export { drawflowData };
