import Reflux from 'reflux';
import ListActions from '../actions/listActions';

const ListStore = Reflux.createStore({
    listenables: ListActions,
  
    init() {
        // this.items = [];  
    },

    loadItems() { 
        this.trigger({
            loading: true
        });
    },

    onLoadItemsCompleted(items) {
        // this.items = items;
        this.trigger({
            loading: false,
            items: items
        });
    },

    onLoadItemsFailed(error) {
        this.trigger({
            loading: false,
            items: []
        });
    }
});

export default ListStore;