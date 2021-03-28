const comma = (num) => {

    const numType = typeof(num);
    if(numType === 'string') {
        return num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }else if(numType === 'number'){
        return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }else{
        return num
    }
  }
  
export default comma;