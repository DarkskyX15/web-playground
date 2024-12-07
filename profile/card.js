const MyCard = {} || MyCard;

MyCard.card_extension = (() => {
  const offset_height = 10;
  let stored_cards = [];

  function addTags(index) {
    for (let i = 0; i < index; ++i) {
      stored_cards[i].classList.add('h_left');
    }
    stored_cards[index].classList.add('h_on');
    for (let i = index + 1; i < stored_cards.length; ++i) {
      stored_cards[i].classList.add('h_right');
    }
  }

  function removeTags(index) {
    for (let i = 0; i < index; ++i) {
      stored_cards[i].classList.remove('h_left');
    }
    stored_cards[index].classList.remove('h_on');
    for (let i = index + 1; i < stored_cards.length; ++i) {
      stored_cards[i].classList.remove('h_right');
    }
  }

  return {
    init: function(class_name) {
      let collected = document.getElementsByClassName(class_name);
      stored_cards = collected;

      for (let i = 0; i < collected.length; ++i) {
        
        let element = collected[i];
        let children_list = element.children;
        let bottom_element = null;
        let top_text_height = 0;
        let image_ = null;

        for (let index = 0; index < children_list.length; ++index) {
          let child = children_list.item(index);
          if (child.className === 'bottom-text') {
            bottom_element = child;
          } else if (child.className === 'top-text') {
            top_text_height = child.getBoundingClientRect().height;
          } else if (child.className === 'img') {
            image_ = child;
          }
        }

        element.addEventListener('mouseenter', () => {
          let text = bottom_element;
          if (text === null) return ;
          let rect = text.getBoundingClientRect();
          let image_height = image_.getBoundingClientRect().height;
          element.style.height = 
          `${rect.height + top_text_height + image_height + offset_height}px`;
          addTags(i);
        });
        element.addEventListener('mouseleave', () => {
          element.style.height = '';
          removeTags(i);
        });
      }
    }
  };

})();

MyCard.card_extension.init('card');
