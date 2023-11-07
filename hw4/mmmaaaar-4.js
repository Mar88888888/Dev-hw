class PaginationHelper {
	constructor(collection, itemsPerPage) {
	    this.items = collection;
        this.itemsPerPage = itemsPerPage;
	}

	itemCount() {
        return this.items.length;
	}

	pageCount() {
        return Math.ceil(this.itemCount() / this.itemsPerPage);
	}

	pageItemCount(pageIndex) {
        
        if(pageIndex < 0 || pageIndex >= this.pageCount()){
        return -1;
        }

        let fullPages = Math.floor(this.items.length / this.itemsPerPage);
        
        if(pageIndex == fullPages && this.pageCount() > fullPages){
        return this.itemCount() % this.itemsPerPage;
        }
        
        return this.itemsPerPage; 
	}

	pageIndex(itemIndex) {
        if(itemIndex < 0 || itemIndex >= this.items.length) return -1;
        return Math.floor(itemIndex / this.itemsPerPage);
	}
}