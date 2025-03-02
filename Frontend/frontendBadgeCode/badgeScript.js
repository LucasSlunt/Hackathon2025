    function createBadge(level,imagePath){
      changeBadgeTier(level);
      setImage(imagePath)
    }
    
    function changeBadgeTier(level) {
      // Get all elements with the badge-colour classes
      const colour1Elements = document.querySelectorAll('.badge-colour-1');
      const colour2Elements = document.querySelectorAll('.badge-colour-2');
      const colour3Elements = document.querySelectorAll('.badge-colour-3');

      // Remove existing color classes
      colour1Elements.forEach(el => {
        el.classList.remove('badge-bronze-1', 'badge-silver-1', 'badge-gold-1');
      });
      colour2Elements.forEach(el => {
        el.classList.remove('badge-bronze-2', 'badge-silver-2', 'badge-gold-2');
      });
      colour3Elements.forEach(el => {
        el.classList.remove('badge-bronze-3', 'badge-silver-3', 'badge-gold-3');
      });

      // Add the new color classes based on the selected scheme
      if (level === 1) {
        colour1Elements.forEach(el => el.classList.add('badge-bronze-1'));
        colour2Elements.forEach(el => el.classList.add('badge-bronze-2'));
        colour3Elements.forEach(el => el.classList.add('badge-bronze-3'));
      } else if (level === 2) {
        colour1Elements.forEach(el => el.classList.add('badge-silver-1'));
        colour2Elements.forEach(el => el.classList.add('badge-silver-2'));
        colour3Elements.forEach(el => el.classList.add('badge-silver-3'));
      } else if (level === 3) {
        colour1Elements.forEach(el => el.classList.add('badge-gold-1'));
        colour2Elements.forEach(el => el.classList.add('badge-gold-2'));
        colour3Elements.forEach(el => el.classList.add('badge-gold-3'));
      }
    }
  function setImage(imagePath){
    
   document.getElementById("inner-badge-image").src=imagePath;
   }