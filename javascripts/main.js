$(function(){

  var suits = ["hearts", "diamonds", "spades", "clubs"];

  var deck = {
    cards: [],
    show_card: function() {
      return this.cards.length === 52 ? false : true;
    },

    createDeck: function(){
      self = this;
      suits.forEach(function(suit) {
        for(var i = 1; i <= 13; i ++) {
          var value;
          if (i === 1)             { value = "ace"; } 
          else if (i > 1 && i < 11) { value = i; } 
          else if (i === 11)       { value = "jack"; } 
          else if (i === 12)       { value = "queen"; } 
          else if (i === 13)       { value = "king"; }
          self.cards.push(value + " of " + suit);
        }
      });
    },

    drawCard: function() {
      var random_number = Math.floor(Math.random() * this.cards.length),
          random_card = this.cards[random_number];
      this.cards.splice(random_number, 1);
      console.log(deck.cards.length);
      this.current_suit = random_card.split(" ")[2];
      this.current_value = random_card.split(" ")[0];
      this.graveyard.push({number: this.graveyard.length + 1, name: random_card});
      return random_card
    },

    graveyard: []
  }; 
  
  var playarea = Handlebars.compile($("#playarea_t").html());
  $("#draw_card").click(function(e) {
    e.preventDefault();
    deck.drawCard();
    updateHTML();
  });

  function updateHTML() {
    $("#playarea").html(playarea(deck));
  }

  $("#shuffle").click(function(e) {
    e.preventDefault();
    deck.cards = [];
    current_suit: "";
    current_value: "";
    deck.graveyard = [];
    deck.createDeck();
    updateHTML();
  });
  
  deck.createDeck();
  updateHTML();
});