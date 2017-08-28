export default {
  createUnit: async (ctx, next) => {
    const { body = {} } = ctx.request
    const { unitName } = body

    // setTimeout(() => {
      ctx.type = 'application/json'
      ctx.body =  {
        "data": {
            "seriesId": 14587754555514,
            "unitId": new Date().getTime(),
            "unitName": unitName,
            "userId": 1234
        },
        "message": "",
        "status": 0,
        "time": "2017-05-26T10:23:17"
      }
    // }, 5000)
  },
  removeContent: async (ctx, next) => {
    const { body = {} } = ctx.request
    const { contentId } = body

    ctx.type = 'application/json'
    ctx.body =  {
      "data": {
        "result": true
      },
      "message": "",
      "status": 0,
      "time": "2017-05-26T10:23:17"
    }
  },
  removeUnit: async (ctx, next) => {
    const { body = {} } = ctx.request
    const { unitId } = body

    ctx.type = 'application/json'
    ctx.body =  {
      "data": {
        "result": true
      },
      "message": "",
      "status": 0,
      "time": "2017-05-26T10:23:17"
    }
  },
  updateUnit: async (ctx, next) => {
    const { body = {} } = ctx.request
    const { unitId, unitName } = body

    ctx.type = 'application/json'
    ctx.body =  {
      "data": {
        "result": true
      },
      "message": "",
      "status": 0,
      "time": "2017-05-26T10:23:17"
    }
  },
  list: async (ctx, next) => {
    ctx.type = 'application/json'
    ctx.body = {
      "data": [
        {
          "unitId": "1234",
          "unitName": "单元一777",
          "contentList": [
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517777",
              "contentId": 14950257317770434,
            }
          ]
        },
        {
          "unitId": "1235",
          "unitName": "单元二222",
          "contentList": [
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517111",
              "contentId": 14951110257312220434,
            },
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517666",
              "contentId": 14956660257312220434,
            },
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517333",
              "contentId": 14950233357312220434,
            }
          ]
        },
        {
          "unitId": "0",
          "unitName": "",
          "contentList": [
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517111",
              "contentId": 14951110257310111434,
            },
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517222",
              "contentId": 14950222257310434,
            },
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517333",
              "contentId": 14953330257310434,
            },
            {
              "liveStatus": 11,
              "contentName": "HappyTalk170517444",
              "contentId": 14954440257310434,
            }
          ]
        }
      ],
      "message": "",
      "status": 0,
      "time": "2017-05-11T17:04:57+0800"
    }
  }
}