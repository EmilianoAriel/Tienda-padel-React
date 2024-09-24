export const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  
    const formattedPrice = formatter.format(price);
    
   
    const [integerPart, fractionPart] = formattedPrice.split(',');

    if (fractionPart === '00') {
      return integerPart;  
    } else {
      return formattedPrice;  
    }
  };
  