/**
 * Created by xiangwenwen on 16/6/8.
 */

var request = require('request');
var config = require('../../config/');
var logger = require('../../logger/');
var CNodeAccesstokenUrl = config.CNodeBaseUrl + '/accesstoken';

function * CNodeAccesstoken (next){
  var token = this.body.accesstoken;
  request({
    method: 'POST',
    url: CNodeAccesstokenUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'accesstoken':token})
  },function(err,httpResponse,body){
    if(err){
      console.log(err)
    } else {
      logger.info(body);
    }
  })
}

module.exports = CNodeAccesstoken;
