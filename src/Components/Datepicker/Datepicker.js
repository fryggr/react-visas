export const  renderers = {
  renderDay: function( props, currentDate, selectedDate ){
    return <td {...props}>{currentDate.date() }</td>;
  },
  renderMonth: function( props, month, year, selectedDate){
    return <td {...props} className="Datepicker__month">{ Moment(month + 1, 'MM').format('MMM') }</td>;
  },
  renderYear: function( props, year, selectedDate ){
    return <td {...props} className="Datepicker__year">{ year  }</td>;
  }
}
