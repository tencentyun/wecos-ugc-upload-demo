/**
 * 需要配置COS相关的config信息
 * 详情可看API文档 https://www.qcloud.com/document/product/436/6066
 */
const config = {
    cosSignatureUrl: 'https://www.qcloudy.com',
    region: 'tj',
    appid: '1253189073',
    bucketname: 'weixintest',
    dir_name: ''
};


exports.cosSignatureUrl = config.cosSignatureUrl
exports.cosUrl = `https://${config.region}.file.myqcloud.com/files/v2/${config.appid}/${config.bucketname}${config.dirname}`