var Odoo = require('../src/index');
var config = require('./config');
var odoo = new Odoo(config);

(async() => {
    await odoo.connect();
    let ids = await odoo.execute_kw('account.invoice', 'search', [
        [['type', '=', 'out_invoice'], ['state', '=', 'open']]
    ]);
    let rs = await odoo.render_report('account.report_invoice', ids)
    console.log("Result: ", rs);
})();

// odoo.connect(function (err) {
//     if (err) { return console.log(err); }
//     console.log('Connected to Odoo server.');
//     var inParams = [];
//     inParams.push([['type', '=', 'out_invoice'], ['state', '=', 'open']]);
//     var params = [];
//     params.push(inParams);
//     odoo.execute_kw('account.invoice', 'search', params, function (err, value) {
//         if (err) { return console.log(err); }
//         if(value){
//             var params = [];
//             params.push(value);
//             odoo.render_report('account.report_invoice', params, function (err2, value2) {
//                 if (err2) { return console.log(err2); }
//                 console.log('Result: ' + value2);
//             });
//         }
//     });
// });