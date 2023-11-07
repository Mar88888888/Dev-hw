class Warrior{
    constructor(){
        this.exp = 100;
        this.achievs = [];
        this.rankRange = ["Pushover", "Novice", "Fighter", "Warrior", "Veteran", "Sage", "Elite", "Conqueror", "Champion", "Master", "Greatest"];
    }
    
    experience(){
      return this.exp;
    }
    
    level(){
      return Math.floor(this.experience()/100); 
    }
    
    rank(){
      return this.rankRange[Math.floor(this.level()/10)]
    }
    
    achievements(){
      return this.achievs;
    }
    
    training([description, experience, minLVL]){
      if(this.level() < minLVL){
        return "Not strong enough";
      }
      this.exp += experience;
      if(this.exp > 10000){
        this.exp = 10000;
      }
      this.achievs.push(description);
      return description;
    }
    
    battle(enemyLVL){
      if(enemyLVL > 100 || enemyLVL < 1){
        return "Invalid level";
      }
      
      let levelDifference = enemyLVL - this.level();
      
      if(levelDifference >= 5 && Math.floor(this.level() / 10) < Math.floor(enemyLVL / 10)){
        return "You've been defeated";
      }
      
      if(levelDifference == 0){
        this.exp += 10;        
        if(this.exp > 10000){
          this.exp = 10000;
        }
        return "A good fight";
      }
      if(levelDifference == -1){
        this.exp += 5;
        if(this.exp > 10000){
          this.exp = 10000;
        }
        return "A good fight";
      }
      if(levelDifference <= -2){
        return "Easy fight";
      }
      if(levelDifference > 0){
        this.exp += 20 * levelDifference * levelDifference;
        if(this.exp > 10000){
          this.exp = 10000;
        }
        return "An intense fight";
      }
    }
  }