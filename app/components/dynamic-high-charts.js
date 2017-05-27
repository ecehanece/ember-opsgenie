import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({
    contentDidChange: Ember.observer('content.@each.isLoaded', function() {
        var chart = this.get('chart');
        var seriesName = this.get('content')[0].name;
        chart.series[0].update({ name: seriesName, data: this.get('content')[0].data }, false);
        chart.setTitle(null, { text: seriesName }, false);
        chart.redraw();
    }),
    timeStamps: [],
    init(){
        this._super('..args');
        var count = 1;
        this.get('model.alerts').forEach(function(item){
            if(!this.get('timeStamps').getEach('date').contains(item.createdAt)){
                this.get('timeStamps').pushObject({'date': item.createdAt, 'count': count});
            }else{
                this.get('timeStamps').findBy('date', item.createdAt).count += 1;
            }
        }.bind(this));
        this.set('chartOptions.xAxis.categories', this.get('timeStamps').getEach('date'));
        this.get('content')[0].data = this.get('timeStamps').getEach('count');
    }
});
