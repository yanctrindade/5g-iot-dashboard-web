import React, {Component} from "react";
import { DatePicker} from "antd";
import moment from "moment";
import locale from "antd/es/date-picker/locale/pt_BR";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

class MapDatePicker extends Component{

  constructor(props) {
    super(props);

    this.state = 
                {
                  dateStart:null,
                  dateEnd:null,
                };
  }

    onChange = (dates, dateStrings) => {
      if(dates[0] === undefined && dates[1] === undefined){
        this.props.onClose()
      }
    }
    
    onOk = (dates, dateString) => {
      this.props.render(dates[0],dates[1])
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
                onOk={this.onOk}
                disabledTime={this.disabledRangeTime}
                // size={"large"}
            />
          );
      }
}

export default MapDatePicker;