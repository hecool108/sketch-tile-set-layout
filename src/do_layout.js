var Rectangle = require('sketch/dom').Rectangle
export default function(context) {
  const selectedLayers = context.selection;
  var maxW = 0;
  var maxH = 0;
  var greatL = null;
  var layerParent;
  var sortedLayers = [];
  if(selectedLayers.length != 0){
    for (let index = 0; index < selectedLayers.count(); index++) {
      const element = selectedLayers[index];
      sortedLayers.push({
        name:element.name(),
        layer:element
      })
    }
    sortedLayers.sort((a,b)=>{
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    for(var i = 0; i < selectedLayers.count(); i++){
      var layer = selectedLayers[i];
      layerParent = layer.parentGroup();
      var f = layer.frame();
      if(f.width() >= maxW && f.height() >= maxH){
        maxW = f.width();
        maxH = f.height();
        greatL = layer;
      } 
    }
    var abW = layerParent.frame().width();
    var columns = Math.floor(abW/maxW) - 1;
    var cIndex = 0;
    var rIndex = 0;
    
    for(var i = 0; i < sortedLayers.length; i++){
      var layer = sortedLayers[i]["layer"];
      var f = layer.frame();
      f.setX(cIndex*maxW + (maxW - f.width())/2);
      f.setY(rIndex*maxH + (maxH - f.height()));
      if(cIndex < columns){
        cIndex++;
      }else{
        cIndex = 0;
        rIndex ++;
      }
    }
    layerParent.frame().setHeight((rIndex + 1) * maxH);
    context.document.showMessage("The Max size of assets is w:"+maxW+" h:"+maxH);
  }

}