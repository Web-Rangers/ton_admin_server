const axios = require('axios');
var config = require('./config.json');
const {status} = require('../../data/json_rpc_status')
const {add_page, create_service} = require('../../db/operations/service')
class ServicesObserver {
    constructor() {
      this.services = config;
    }

    async checkServices(){
        let result_services = this.services
        for (const service of result_services) {
            for (const page of service.pages) {
                
                var start = new Date();
                let response = await axios.get(page.url, {
                    validateStatus: function (status) {
                      return status < 1000; // Resolve only if the status code is less than 1000
                    }
                })
                var end = new Date();
               
                
                if(response.status == 200){
                    page.response_status = response.status
                    page.response_time = end - start
                }
                else{
                    //telegram alert
                    page.response_status = response.status
                    page.response_time = end - start
                }
            }
        }
        result_services.forEach(element => {
            console.log(element);
        });
        status.update_status({services:result_services})
    }
  }
  const service_monitor = new ServicesObserver()
  module.exports = {service_monitor};