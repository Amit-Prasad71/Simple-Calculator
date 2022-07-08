var items = document.querySelectorAll(".item");
var inputField = document.querySelector(".input-field");
var resultField = document.querySelector(".result-field");

var operations = ["+","-","*","%","/"];
var specialOp = ["AC", "CLR", "=", "Ans"];
var digits = ["0","1","2","3","4","5","6","7","8","9"];

function buttonClass(key){
  switch(key){
    case "0":return "zero";
    case "1":return "one";
    case "2":return "two";
    case "3":return "three";
    case "4":return "four";
    case "5":return "five";
    case "6":return "six";
    case "7":return "seven";
    case "8":return "eight";
    case "9":return "nine";
    case ".":return "dot";
    case "=":return "equal";
    case "+":return "plus";
    case "-":return "minus";
    case "*":return "multiply";
    case "/":return "divide";
    case "%":return "percent";
    default:return key;
  }
}
function buttonAnimate(key){
  key = buttonClass(key);

  document.querySelector("."+key).classList.add("clicked");
  setTimeout(function(){
    document.querySelector("."+key).classList.remove("clicked");
  },100);

}
function push(value){
  var size = inputField.value.length;
  if(size < 20)
      if(operations.includes(value)){
          if(operations.includes(inputField.value[size-1]) )
              clr();
          if(inputField.value[size-1]==='.'){
              inputField.value=inputField.value + '0';
          }
          inputField.value = inputField.value + value;
      }
      else{
          if(value==='.'){
                if(operations.includes(inputField.value[size-1]) ){
                    push("0");
                }
                inputField.value = inputField.value + ".";
          }
          else
                inputField.value=inputField.value + value;

      }
}
function ac(){
  inputField.value="";
}
function clr(){
  inputField.value=inputField.value.slice(0,inputField.value.length-1);
}
function add(operand1,operand2){
  return operand1+operand2;
}
function subtract(operand1,operand2){
  return operand1-operand2;
}
function multiply(operand1,operand2){
  return operand1*operand2;
}
function divide(operand1,operand2){
  return operand1/operand2;
}
function mod(operand1,operand2){
  return operand1%operand2;
}
function checkInput(value){
    var separate=[];
    var temp="";
    for(var i=0;i<value.length;i++){
        if(operations.includes(value[i]) ){
            if(temp!="")
              separate.push(temp);
            separate.push(value[i]);
            temp="";
        }
        else{
            temp=temp+value[i];
        }
    }
    if(temp!="")
        separate.push(temp);

    if(["+","-"].includes(separate[0]) && !operations.includes(separate[separate.length-1]) ){
        separate[1]=separate[0]+separate[1];
        separate.shift();
        return separate;
    }
    if(separate.length==0){
      return [];
    }

    else if(["*","/","%"].includes(separate[0]) || operations.includes(separate[separate.length-1]) )
      return [];

    else
      return separate;
}
function postfix(list){
  var exp=[];
  var stack=[];
  for(var i=0;i<list.length;i++){
      if( operations.includes(list[i]) ){
            if(stack.length!=0){
                if(stack[stack.length-1]==='+' && (list[i]==='+' || list[i]==='-') ){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='+' && (list[i]==='/' || list[i]==='%' || list[i]==='*') ){
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='-' && (list[i]==='+' || list[i]==='-')){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='-' && (list[i]==='/' || list[i]==='%' || list[i]==='*') ){
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='/' && (list[i]==='+' || list[i]==='-') ){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='/' && (list[i]==='/' || list[i]==='%' || list[i]==='*') ){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='*' && (list[i]==='+' || list[i]==='-') ){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='*' && (list[i]==='/' || list[i]==='%' || list[i]==='*') ){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='%' && (list[i]==='+' || list[i]==='-') ){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
                else if(stack[stack.length-1]==='%' && (list[i]==='/' || list[i]==='%' || list[i]==='*') ){
                    exp.push(stack[stack.length-1]);
                    stack.pop();
                    stack.push(list[i]);
                }
            }
          else{
                stack.push(list[i]);
          }
      }
      else{
          exp.push(list[i]);
      }
  }
  while(stack.length!=0){
    exp.push(stack[stack.length-1]);
    stack.pop();
  }
  return exp;
}
function result(value){
    var separate=checkInput(value);
    if(separate.length!=0){
        var exp=postfix(separate);
        var stack=[];
        for(var i=0;i<exp.length;i++){
              if(operations.includes(exp[i]) ){
                  var operand2=Number(stack[stack.length-1]);
                  stack.pop();
                  var operand1=Number(stack[stack.length-1]);
                  stack.pop();
                  switch(exp[i]){
                    case '+':stack.push( String( add(operand1,operand2) ) );
                            break;
                    case '-':stack.push( String( subtract(operand1,operand2) ) );
                            break;
                    case '*':stack.push( String( multiply(operand1,operand2) ) );
                            break;
                    case '/':stack.push( String( divide(operand1,operand2) ) );
                            break;
                    case '%':stack.push( String( mod(operand1,operand2) ) );
                            break;
                    default:
                  }

              }
              else{
                stack.push(exp[i]);
              }

        }
        return stack[stack.length-1];
    }
    else
        return "Invalid Expression";
}
function answer(){
  if(resultField.value != ""){
    inputField.value = resultField.value;
    resultField.value = "";
  }
}



for(var i=0;i<items.length;i++){
      items[i].addEventListener("click",function(){
          this.classList.add("clicked");
          var key=this.firstElementChild.textContent;
          buttonAnimate(key);

          resultField.style.opacity="0";
          resultField.style.height="0";
          if(!specialOp.includes(key))
            push(key);
      });
}
document.querySelector(".AC").addEventListener("click",function(){
    ac();
});
document.querySelector(".CLR").addEventListener("click",function(){
    clr();
});
document.querySelector(".Ans").addEventListener("click",function(){
    answer();
});
document.querySelector(".equal").addEventListener("click",function(){

    resultField.style.opacity = "100%";
    resultField.style.height = "30px";
    resultField.value = result(inputField.value);

});
