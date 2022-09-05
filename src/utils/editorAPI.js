const API = "http://localhost:3000/nodes";

const dataAPI = (data) => {
  const dataNodeInput = (node) => ({
    node: node.Node,
    input: node.Input,
  });

  const dataNodeOutput = (node) => ({
    node: node.Node,
    output: node.Output,
  });

  const connectionsOutput = (connections) =>
    connections?.map((connection) => dataNodeOutput(connection) || {});

  const connectionsInput = (connections) =>
    connections?.map((connection) => dataNodeInput(connection) || {});

  const dataInput = (input) => ({
    input_1: {
      connections: connectionsInput(input.Input_1.Connections) || [],
    },
    input_2: {
      connections: connectionsInput(input.Input_2.Connections) || [],
    },
  });

  const dataOutput = (output) => ({
    output_1: {
      connections: connectionsOutput(output.Output_1.Connections) || [],
    },
    output_2: {
      connections: connectionsOutput(output.Output_2.Connections) || [],
    },
  });

  const setData = (data) => ({
    script: data?.Script,
    total: data?.Total,
    value_1: data?.Value_1,
    value_2: data?.Value_2,
    condition: data?.Condition,
  });

  return {
    id: data.ID,
    name: data.Name,
    data: setData(data.Data) || {},
    class: data.Class,
    html: data.Html,
    typenode: data.Typenode,
    inputs: dataInput(data.Inputs) || {},
    outputs: dataOutput(data.Outputs) || {},
    pos_x: data.Pos_x,
    pos_y: data.Pos_y,
    input: data.Input,
  };
};

const setDraflow = async (drawflow) => {
  return await {
    drawflow: {
      Home: {
        data: { ...drawflow },
      },
    },
  };
};

const getAllPrograms = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();

    const dataProgram = data.map((dataProgram) => ({
      ...dataAPI(dataProgram),
    }));

    return setDraflow(dataProgram);
  } catch (error) {
    console.error(error);
  }
};

export { getAllPrograms };
