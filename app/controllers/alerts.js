import Ember from 'ember';

export default Ember.Controller.extend({
    notify: Ember.inject.service('notify'),
    chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Alerts / Time'
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: 'Alert count'
          }
        }
    },
    chartData: [{
        name: 'Alerts',
        data: []
        }],
    notes: {
      "notes": [
            {
              "alertId": "326c1aac-288d-45ae-add0-20b5018db638",
              "id": "",
              "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus dolor quis augue auctor, id rutrum massa placerat. Morbi tellus odio, ultrices quis porta nec, condimentum pulvinar ligula. Morbi eleifend sed mauris ac vehicula. Etiam at pharetra lacus, ut efficitur nulla. Duis lobortis est lacus, eu ultricies sapien placerat a. Integer in nulla commodo, vulputate mi id, elementum eros. Integer vestibulum augue ut porttitor elementum."
            },
            {
              "alertId": "92208a0a-25da-4a42-b0ab-699712ef0448",
              "id": "1",
              "note": "Ut rutrum ante porta vulputate euismod. Maecenas nec porta leo. Aenean vestibulum lacus at quam mattis, in commodo nulla vestibulum. Nulla maximus nulla eu sem fermentum"
            },
            {
              "alertId": "5668141e-b07a-4503-98ee-79f3688dfbc9",
              "id": "2",
              "note": "Vestibulum sodales mauris sed nibh rhoncus, eget dapibus lorem consequat. Pellentesque quis finibus ante. Donec magna quam, hendrerit a leo id, maximus dictum lectus. Ut ut ex nibh."
            },
            {
              "alertId": "5668141e-b07a-4503-98ee-79f3688dfbc9",
              "id": "3",
              "note": "faucibus metus ac, congue nulla. Lorem ipsum dolor sit amet"
            },
            {
              "alertId": "326c1aac-288d-45ae-add0-20b5018db638",
              "id": "4",
              "note": "     "
            },
            {
              "alertId": "5668141e-b07a-4503-98ee-79f3688dfbc9",
              "id": "5",
              "note": "Interdum et malesuada fames ac ante ipsum primis in faucibus."
            },
            {
              "alertId": "326c1aac-288d-45ae-add0-20b5018db638",
              "id": "6",
              "note": "malesuada. Nam ornare diam risus, eget aliquet erat porttitor at. Nullam eget fermentum tortor. Donec gravida condimentum libero, ut vulputate enim congue nec. Quisque non lorem lacus. Curabitur nec elementum orci, vel viverra elit. Pellentesque accumsan mauris at nisi condimentum, eu cursus sapien porttitor. Fusce nisi magna, dignissim sed molestie non, gravida ac sem. Cras eu fermentum mauris. In congue ante quis blandit aliquet. Vestibulum sollicitudin vestibulum quam, finibus consectetur odio interdum nec. Fusce ut leo at diam eleifend mattis."
            },
            {
              "alertId": "a161cbeb-63f4-4602-b0c0-710a7dfbe135",
              "id": "7",
              "note": "Morbi semper"
            }
          ]
    },
    noteOfAlert: {},
    addTagClicked: false,
    actions: {
        toggleBody: function(id) {
            var noteOfAlert = this.get('notes.notes').filterBy('alertId', id).rejectBy('id', '');
            var notesArray = [];
            noteOfAlert.forEach(function(item) {
                if(item.note.trim() !== ''){
                    notesArray.pushObject(item);
                }
            }.bind(this));
            this.set('noteOfAlert', notesArray);
        },
        ack: function(alert) {
            Ember.set(alert, 'acknowledged', !alert.acknowledged);
            if(!alert.acknowledged){
                Ember.set(alert, 'owner', 'No Owner');
                this.get('notify').success('Alert #' + alert.tinyId + ' unacknowledged successfully!');
            }else{
                Ember.set(alert, 'owner', 'Ecehan Ece');
                this.get('notify').success('Alert #' + alert.tinyId + ' acknowledged successfully!');
            }
        },
        openSnoozeModal(alert) {
            Ember.$('.ui.alert.modal').modal('show');
            this.set('snoozedAlert', alert);
        },
        delete: function(alert) {
            this.get('model.alerts').removeObject(alert);
            this.get('notify').alert('Alert #' + alert.tinyId + ' deleted successfully!');
        },
        addTag: function() {
            this.set('addTagClicked', true);
        },
        updateTag: function(alert) {
            this.set('addTagClicked', false);
            alert.tag.pushObject(this.get('tagInput'));
            this.set('tagInput', '');
        },
        deleteTag: function(alert, tag) {
            alert.tag.popObject(tag);
        }
    }
});
