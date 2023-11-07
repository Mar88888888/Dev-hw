let Vector = function (components) {
    this.components = components;
    
    this.toString = () => `(${this.components.join(',')})`;
    this.equals = function(vector2){
      for(let i = 0; i < this.components.length; i++){
        if(this.components[i] != vector2.components[i]){
          return false;
        }
      }
      return true;
    }
    
    this.add = function (vector2){
      if(this.components.length == vector2.components.length){
        let resultComponents = [];
        for(let i = 0; i < this.components.length; i++){
          resultComponents.push(this.components[i] + vector2.components[i]);
        }
        return new Vector(resultComponents);
      }else{
        throw new Error("Vectors' components have different length")
      }
    }
    
    this.subtract = function(vector2){
      if(this.components.length == vector2.components.length){
        let resultComponents = [];
        for(let i = 0; i < this.components.length; i++){
          resultComponents.push(this.components[i] - vector2.components[i]);
        }
        return new Vector(resultComponents);
      }else{
        throw new Error("Vectors' components have different length")
      }
    }
    
    this.dot = function(vector2){
      if(this.components.length == vector2.components.length){
        let result = 0;
        for(let i = 0; i < this.components.length; i++){
          result += this.components[i] * vector2.components[i];
        }
        return result;
      }else{
        throw new Error("Vectors' components have different length")
      }
    }
    
    this.norm = function(){
      let result = 0;
      for(let i = 0; i < this.components.length; i++){
          result += Math.pow(this.components[i], 2);
        }
      return Math.sqrt(result)
    }
  };