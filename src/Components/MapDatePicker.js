import React, {Component} from "react";
import { DatePicker } from "antd";
import moment from "moment";
import locale from "antd/es/date-picker/locale/pt_BR";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

class MapDatePicker extends Component{

    onChange = (dates, dateStrings) => {
        console.log("From: ", dates[0], ", to: ", dates[1]);
        console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    }
      
    getDisabledHours = (date) => {
        var hours = [];
        if(moment().diff(date, 'days') === 0)
        {
            for (var i = 24; i > moment().hour(); i--) {
            hours.push(i);
            }
        }

        return hours;
    }

    getDisabledMinutes = (date,selectedHour) => {
        var minutes = [];

        if(moment().diff(date, 'days') === 0)
        {
            if (selectedHour === moment().hour()) {
            for (var i = 59; i > moment().minute(); i--) {
                minutes.push(i);
            }
            }
        }

        return minutes;
    }

    disabledRangeTime = (date, type) => {
        if (Array.isArray(date)) {
            if (type === "start") {
              let selectedHour = parseInt(moment(date[0]).format("HH"), 10);
        
              return {
                disabledHours: () => this.getDisabledHours(date[0]),
                disabledMinutes: () => this.getDisabledMinutes(date[0], selectedHour)
              };
            }
        
            if (type === "end"){
              let selectedHour = parseInt(moment(date[1]).format("HH"), 10);
        
              return {
                disabledHours: () => this.getDisabledHours(date[1]),
                disabledMinutes: () => this.getDisabledMinutes(date[1], selectedHour)
              };
            }    
          } 
      }

      render(){
          return (
            <RangePicker
                ranges={{
                Hoje: [moment(), moment()],
                "Mês atual": [moment().startOf("month"), moment().endOf("month")]
                }}
                locale={locale}
                format="DD/MM/YYYY à\s HH:mm"
                showTime={{ format: "HH:mm" }}
                onChange={this.onChange}
                disabledDate={current => {
                return current && current >= moment();
                }}
                disabledTime={this.disabledRangeTime}
            />
          );
      }
}

export default MapDatePicker;