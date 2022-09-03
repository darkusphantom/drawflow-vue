const drawflowData = {
  drawflow: {
    Home: {
      data: {
        1: {
          id: 1,
          name: "Value",
          data: {
            id: 1,
            name: "Value",
            data: {
              script: "number1 = 5",
            },
            class: "Value",
            html: "Value",
            typenode: "vue",
            inputs: {},
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: 329,
            pos_y: 257,
            input: "5",
          },
          class: "Value",
          html: "Value",
          typenode: "vue",
          inputs: {},
          outputs: {
            output_1: {
              connections: [
                {
                  node: "4",
                  output: "input_1",
                },
                {
                  node: "4",
                  output: "input_2",
                },
              ],
            },
          },
          pos_x: -448.5,
          pos_y: 19,
        },
        4: {
          id: 4,
          name: "Add",
          data: {
            id: 4,
            name: "Add",
            data: {
              result: 10,
              valueA: 5,
              valueB: 5,
              script:
                "\n      def calculate(operation):\n        a = 5\n        b = 5\n        value = 0\n\n        if operation == 'add': value = a+b\n        if operation == 'subs': value = a-b\n        if operation == 'mult': value = a*b\n        if operation == 'div': value = a/b\n        if operation == 'mod': value = a%b\n        if operation == 'pow': value = a**b\n\n\n      typeOperation = add\n\n      print(calculate(typeOperation))\n    ",
            },
            class: "Add",
            html: "Add",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [],
              },
              input_2: {
                connections: [],
              },
            },
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: 13.99,
            pos_y: -11.99,
          },
          class: "Add",
          html: "Add",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "1",
                  input: "output_1",
                },
              ],
            },
            input_2: {
              connections: [
                {
                  node: "1",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [
                {
                  node: "5",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: -66.42,
          pos_y: -40.42,
        },
        5: {
          id: 5,
          name: "Script",
          data: {},
          class: "Script",
          html: "Script",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "4",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [
                {
                  node: "6",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: 291,
          pos_y: -24,
        },
        6: {
          id: 6,
          name: "Log",
          data: {},
          class: "Log",
          html: "Log",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "5",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {},
          pos_x: 636,
          pos_y: -28.42,
        },
        7: {
          id: 7,
          name: "Value",
          data: {
            id: 7,
            name: "Value",
            data: {
              script: "number7 = 7",
            },
            class: "Value",
            html: "Value",
            typenode: "vue",
            inputs: {},
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: -147.42,
            pos_y: 355.21,
            input: "7",
          },
          class: "Value",
          html: "Value",
          typenode: "vue",
          inputs: {},
          outputs: {
            output_1: {
              connections: [
                {
                  node: "9",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: -450.42,
          pos_y: 336,
        },
        8: {
          id: 8,
          name: "Value",
          data: {
            id: 8,
            name: "Value",
            data: {
              script: "number8 = 3",
            },
            class: "Value",
            html: "Value",
            typenode: "vue",
            inputs: {},
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: -197.42,
            pos_y: 586.64,
            input: "3",
          },
          class: "Value",
          html: "Value",
          typenode: "vue",
          inputs: {},
          outputs: {
            output_1: {
              connections: [
                {
                  node: "9",
                  output: "input_2",
                },
              ],
            },
          },
          pos_x: -446.57,
          pos_y: 605,
        },
        9: {
          id: 9,
          name: "Conditional",
          data: {
            id: 9,
            name: "Conditional",
            data: {
              result: true,
              script:
                "\n    def calculate(operation):\n      a = 7\n      b = 3\n      value = 0\n\n      if operation == 'equal': value a == b\n      if operation == 'nequal': value = a != b\n      if operation == 'greatthan': value = a > b\n      if operation == 'lessthan': value = a < b\n      if operation == 'greateq': value = a >= b\n      if operation == 'lesseq': value = a <= b\n\n    \n    typeOperation = nequal\n    print(typeOperation)\n    ",
            },
            class: "Conditional",
            html: "Conditional",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [],
              },
              input_2: {
                connections: [],
              },
            },
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: -46.0,
            pos_y: 489.49,
          },
          class: "Conditional",
          html: "Conditional",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "7",
                  input: "output_1",
                },
              ],
            },
            input_2: {
              connections: [
                {
                  node: "8",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [
                {
                  node: "10",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: -63.42,
          pos_y: 419.57,
        },
        10: {
          id: 10,
          name: "Script",
          data: {},
          class: "Script",
          html: "Script",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "9",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [
                {
                  node: "11",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: 293,
          pos_y: 459.57,
        },
        11: {
          id: 11,
          name: "Log",
          data: {},
          class: "Log",
          html: "Log",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "10",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {},
          pos_x: 672.42,
          pos_y: 457.42,
        },
        13: {
          id: 13,
          name: "Value",
          data: {
            id: 13,
            name: "Value",
            data: {
              script: "number13 = 6",
            },
            class: "Value",
            html: "Value",
            typenode: "vue",
            inputs: {},
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: -338.85,
            pos_y: 1078.07,
            input: "6",
          },
          class: "Value",
          html: "Value",
          typenode: "vue",
          inputs: {},
          outputs: {
            output_1: {
              connections: [
                {
                  node: "15",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: -442.42,
          pos_y: 985.85,
        },
        14: {
          id: 14,
          name: "Value",
          data: {
            id: 14,
            name: "Value",
            data: {
              script: "number14 = 6",
            },
            class: "Value",
            html: "Value",
            typenode: "vue",
            inputs: {},
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: -417.42,
            pos_y: 1333.78,
            input: "6",
          },
          class: "Value",
          html: "Value",
          typenode: "vue",
          inputs: {},
          outputs: {
            output_1: {
              connections: [
                {
                  node: "15",
                  output: "input_2",
                },
              ],
            },
          },
          pos_x: -440,
          pos_y: 1264,
        },
        15: {
          id: 15,
          name: "Add",
          data: {
            id: 15,
            name: "Add",
            data: {
              result: 12,
              valueA: 6,
              valueB: 6,
              script:
                "\n      def calculate(operation):\n        a = 6\n        b = 6\n        value = 0\n\n        if operation == 'add': value = a+b\n        if operation == 'subs': value = a-b\n        if operation == 'mult': value = a*b\n        if operation == 'div': value = a/b\n        if operation == 'mod': value = a%b\n        if operation == 'pow': value = a**b\n\n\n      typeOperation = add\n\n      print(calculate(typeOperation))\n    ",
            },
            class: "Add",
            html: "Add",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [],
              },
              input_2: {
                connections: [],
              },
            },
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: -57.42,
            pos_y: 1128.07,
          },
          class: "Add",
          html: "Add",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "13",
                  input: "output_1",
                },
              ],
            },
            input_2: {
              connections: [
                {
                  node: "14",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [
                {
                  node: "16",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: -57.42,
          pos_y: 1128.07,
        },
        16: {
          id: 16,
          name: "Loop",
          data: {
            id: 16,
            name: "Loop",
            data: {
              script:
                "\n      def calculate(operation):\n        if operation == 'add': total += value\n        if operation == 'subs': total -= value\n        if operation == 'mult': total *= value\n        if operation == 'div': total /= value\n        if operation == 'mod': total %= value\n      return total\n\n      i = 0\n      max = 10\n      value = 12\n      total = 0\n      typeOperation = add\n\n      for i in range(max)\n        print(calculate(typeOperation))\n    ",
            },
            class: "Loop",
            html: "Loop",
            typenode: "vue",
            inputs: {
              input_1: {
                connections: [],
              },
            },
            outputs: {
              output_1: {
                connections: [],
              },
            },
            pos_x: 403.99,
            pos_y: 1133.78,
          },
          class: "Loop",
          html: "Loop",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "15",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [
                {
                  node: "17",
                  output: "input_1",
                },
              ],
            },
            output_2: {
              connections: [],
            },
          },
          pos_x: 290.57,
          pos_y: 1048.57,
        },
        17: {
          id: 17,
          name: "Script",
          data: {},
          class: "Script",
          html: "Script",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "16",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {
            output_1: {
              connections: [
                {
                  node: "18",
                  output: "input_1",
                },
              ],
            },
          },
          pos_x: 644.57,
          pos_y: 1119,
        },
        18: {
          id: 18,
          name: "Log",
          data: {},
          class: "Log",
          html: "Log",
          typenode: "vue",
          inputs: {
            input_1: {
              connections: [
                {
                  node: "17",
                  input: "output_1",
                },
              ],
            },
          },
          outputs: {},
          pos_x: 1024.57,
          pos_y: 1122,
        },
      },
    },
  },
};
export { drawflowData };
