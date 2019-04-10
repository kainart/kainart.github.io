function sliceTitle() {
    document.querySelectorAll('.videos__item-descr').forEach(item => {
        item.textContent.trim();
        if (item.textContent.length < 50){
            return;
        } else {
            const str =  item.textContent.slice(0, 51) + "...";
            item.textContent = str;
        }
    });

}