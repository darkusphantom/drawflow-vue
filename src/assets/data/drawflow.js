const drawflowData2 = {
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

const drawflowData = {
  drawflow: {
    Home: {
      data: {
        1: {
          id: 1,
          name: "welcome",
          data: {},
          class: "welcome",
          html: '\n    <div>\n      <div class="title-box">👏 Welcome!!</div>\n      <div class="box">\n        <p>Simple flow library <b>demo</b>\n        <a href="https://github.com/jerosoler/Drawflow" target="_blank">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ',
          typenode: false,
          inputs: {},
          outputs: {},
          pos_x: 50,
          pos_y: 50,
        },
        2: {
          id: 2,
          name: "slack",
          data: {},
          class: "slack",
          html: '\n          <div>\n            <div class="title-box"><i class="fab fa-slack"></i> Slack chat message</div>\n          </div>\n          ',
          typenode: false,
          inputs: {
            input_1: { connections: [{ node: "7", input: "output_1" }] },
          },
          outputs: {},
          pos_x: 1028,
          pos_y: 87,
        },
        3: {
          id: 3,
          name: "telegram",
          data: { channel: "channel_2" },
          class: "telegram",
          html: '\n          <div>\n            <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram bot</div>\n            <div class="box">\n              <p>Send to telegram</p>\n              <p>select channel</p>\n              <select df-channel>\n                <option value="channel_1">Channel 1</option>\n                <option value="channel_2">Channel 2</option>\n                <option value="channel_3">Channel 3</option>\n                <option value="channel_4">Channel 4</option>\n              </select>\n            </div>\n          </div>\n          ',
          typenode: false,
          inputs: {
            input_1: { connections: [{ node: "7", input: "output_1" }] },
          },
          outputs: {},
          pos_x: 1032,
          pos_y: 184,
        },
        4: {
          id: 4,
          name: "email",
          data: {},
          class: "email",
          html: '\n            <div>\n              <div class="title-box"><i class="fas fa-at"></i> Send Email </div>\n            </div>\n            ',
          typenode: false,
          inputs: {
            input_1: { connections: [{ node: "5", input: "output_1" }] },
          },
          outputs: {},
          pos_x: 1033,
          pos_y: 439,
        },
        5: {
          id: 5,
          name: "template",
          data: { template: "Write your template" },
          class: "template",
          html: '\n            <div>\n              <div class="title-box"><i class="fas fa-code"></i> Template</div>\n              <div class="box">\n                Ger Vars\n                <textarea df-template></textarea>\n                Output template with vars\n              </div>\n            </div>\n            ',
          typenode: false,
          inputs: {
            input_1: { connections: [{ node: "6", input: "output_1" }] },
          },
          outputs: {
            output_1: {
              connections: [
                { node: "4", output: "input_1" },
                { node: "11", output: "input_1" },
              ],
            },
          },
          pos_x: 607,
          pos_y: 304,
        },
        6: {
          id: 6,
          name: "github",
          data: { name: "https://github.com/jerosoler/Drawflow" },
          class: "github",
          html: '\n          <div>\n            <div class="title-box"><i class="fab fa-github "></i> Github Stars</div>\n            <div class="box">\n              <p>Enter repository url</p>\n            <input type="text" df-name>\n            </div>\n          </div>\n          ',
          typenode: false,
          inputs: {},
          outputs: {
            output_1: { connections: [{ node: "5", output: "input_1" }] },
          },
          pos_x: 341,
          pos_y: 191,
        },
        7: {
          id: 7,
          name: "facebook",
          data: {},
          class: "facebook",
          html: '\n        <div>\n          <div class="title-box"><i class="fab fa-facebook"></i> Facebook Message</div>\n        </div>\n        ',
          typenode: false,
          inputs: {},
          outputs: {
            output_1: {
              connections: [
                { node: "2", output: "input_1" },
                { node: "3", output: "input_1" },
                { node: "11", output: "input_1" },
              ],
            },
          },
          pos_x: 347,
          pos_y: 87,
        },
        11: {
          id: 11,
          name: "log",
          data: {},
          class: "log",
          html: '\n            <div>\n              <div class="title-box"><i class="fas fa-file-signature"></i> Save log file </div>\n            </div>\n            ',
          typenode: false,
          inputs: {
            input_1: {
              connections: [
                { node: "5", input: "output_1" },
                { node: "7", input: "output_1" },
              ],
            },
          },
          outputs: {},
          pos_x: 1031,
          pos_y: 363,
        },
      },
    },
    Other: {
      data: {
        8: {
          id: 8,
          name: "personalized",
          data: {},
          class: "personalized",
          html: "\n            <div>\n              Personalized\n            </div>\n            ",
          typenode: false,
          inputs: {
            input_1: {
              connections: [
                { node: "12", input: "output_1" },
                { node: "12", input: "output_2" },
                { node: "12", input: "output_3" },
                { node: "12", input: "output_4" },
              ],
            },
          },
          outputs: {
            output_1: { connections: [{ node: "9", output: "input_1" }] },
          },
          pos_x: 764,
          pos_y: 227,
        },
        9: {
          id: 9,
          name: "dbclick",
          data: { name: "Hello World!!" },
          class: "dbclick",
          html: '\n            <div>\n            <div class="title-box"><i class="fas fa-mouse"></i> Db Click</div>\n              <div class="box dbclickbox" ondblclick="showpopup(event)">\n                Db Click here\n                <div class="modal" style="display:none">\n                  <div class="modal-content">\n                    <span class="close" onclick="closemodal(event)">&times;</span>\n                    Change your variable {name} !\n                    <input type="text" df-name>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n            ',
          typenode: false,
          inputs: {
            input_1: { connections: [{ node: "8", input: "output_1" }] },
          },
          outputs: {
            output_1: { connections: [{ node: "12", output: "input_2" }] },
          },
          pos_x: 209,
          pos_y: 38,
        },
        12: {
          id: 12,
          name: "multiple",
          data: {},
          class: "multiple",
          html: '\n            <div>\n              <div class="box">\n                Multiple!\n              </div>\n            </div>\n            ',
          typenode: false,
          inputs: {
            input_1: { connections: [] },
            input_2: { connections: [{ node: "9", input: "output_1" }] },
            input_3: { connections: [] },
          },
          outputs: {
            output_1: { connections: [{ node: "8", output: "input_1" }] },
            output_2: { connections: [{ node: "8", output: "input_1" }] },
            output_3: { connections: [{ node: "8", output: "input_1" }] },
            output_4: { connections: [{ node: "8", output: "input_1" }] },
          },
          pos_x: 179,
          pos_y: 272,
        },
      },
    },
  },
};

export { drawflowData, drawflowData2 };
