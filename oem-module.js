/* Experteye OEM Leasing Rate Module — oem-module.js
   Host at: https://www.experteye.com/js/oem-module.js
   Requires Chart.js 4.x loaded before this file           */

var eyeBE={"FR":{"PETROL":[{"brand":"FORD","v":27.75,"n":2},{"brand":"JEEP","v":11.51,"n":8},{"brand":"SKODA","v":11.24,"n":15},{"brand":"KIA","v":4.13,"n":6},{"brand":"OPEL","v":2.87,"n":9},{"brand":"NISSAN","v":1.94,"n":2},{"brand":"SEAT","v":-0.36,"n":2},{"brand":"CITROEN","v":-6.34,"n":4},{"brand":"CUPRA","v":-7.7,"n":2},{"brand":"ALFA ROMEO","v":-8.22,"n":2},{"brand":"FIAT","v":-11.65,"n":4},{"brand":"PEUGEOT","v":-11.84,"n":3}],"PHEV":[{"brand":"LAND ROVER","v":11.48,"n":2},{"brand":"SEAT","v":9.61,"n":2},{"brand":"HYUNDAI","v":0.99,"n":3},{"brand":"KIA","v":-0.75,"n":4},{"brand":"RENAULT","v":-4.52,"n":2}],"LPG":[{"brand":"RENAULT","v":5.22,"n":3},{"brand":"DACIA","v":1.65,"n":5}],"ELECTRIC":[{"brand":"TOYOTA","v":8.68,"n":2},{"brand":"OPEL","v":8.19,"n":5},{"brand":"KIA","v":2.37,"n":9},{"brand":"SKODA","v":3.2,"n":3},{"brand":"RENAULT","v":2.14,"n":9},{"brand":"ALPINE","v":0.9,"n":2},{"brand":"NISSAN","v":-0.33,"n":2},{"brand":"HYUNDAI","v":-1.15,"n":6},{"brand":"ALFA ROMEO","v":-6.28,"n":2},{"brand":"CUPRA","v":-7.75,"n":3},{"brand":"CITROEN","v":-13.25,"n":2}],"HYBRID":[{"brand":"HYUNDAI","v":2.05,"n":5},{"brand":"LEXUS","v":1.55,"n":2},{"brand":"DACIA","v":1.15,"n":4},{"brand":"NISSAN","v":1.06,"n":4},{"brand":"RENAULT","v":0.18,"n":7},{"brand":"TOYOTA","v":0.09,"n":12},{"brand":"KIA","v":-0.7,"n":4},{"brand":"MITSUBISHI","v":-3.0,"n":2}],"DIESEL":[{"brand":"DS","v":-9.96,"n":2},{"brand":"ALFA ROMEO","v":-10.83,"n":2}]},"DE":{"PHEV":[{"brand":"PEUGEOT","v":10.78,"n":20},{"brand":"CUPRA","v":0.4,"n":2}],"PETROL":[{"brand":"CITROEN","v":7.53,"n":9},{"brand":"SUBARU","v":7.38,"n":2},{"brand":"FIAT","v":6.76,"n":16},{"brand":"OPEL","v":-0.004,"n":24},{"brand":"PEUGEOT","v":-1.27,"n":6}],"DIESEL":[{"brand":"FIAT","v":2.27,"n":2},{"brand":"PEUGEOT","v":-0.49,"n":7},{"brand":"OPEL","v":-0.03,"n":7}],"ELECTRIC":[{"brand":"FIAT","v":7.56,"n":18},{"brand":"OPEL","v":-0.02,"n":22},{"brand":"PEUGEOT","v":-0.47,"n":60},{"brand":"CITROEN","v":-4.47,"n":26}]}};
var eyeD={"FR":{"subtitle":"France · May → June 2026 · % change in leasing rate","footnote":"Source: Experteye — OEM B2C offers, France. Brands with ≥2 offers only.","kpi":{"rise":{"val":"+22.0%","sub":"Ford"},"fall":{"val":"−11.8%","sub":"Peugeot"},"avg":{"val":"+1.8%","sub":"185 offers analysed"}},"brand":{"labels":["FORD","SKODA","JEEP","LAND ROVER","SEAT","OPEL","KIA","LEXUS","DACIA","TOYOTA","RENAULT","NISSAN","ALPINE","HYUNDAI","MITSUBISHI","CUPRA","CITROEN","ALFA ROMEO","DS","FIAT","PEUGEOT"],"values":[22.04,9.9,9.7,9.46,4.62,4.32,1.75,1.55,1.37,1.32,1.23,0.93,0.9,0.45,-3.0,-6.09,-8.17,-8.44,-9.96,-11.65,-11.84],"n":[3,18,10,3,4,16,23,2,11,14,22,8,2,15,2,6,7,6,2,4,3]},"energy":{"labels":["PETROL","PHEV","LPG","ELECTRIC","HYBRID","DIESEL"],"values":[3.45,3.14,2.99,0.96,0.002,-2.71],"n":[63,17,8,52,38,7]}},"DE":{"subtitle":"Germany · May → June 2026 · % change in leasing rate","footnote":"Source: Experteye — OEM B2C offers, Germany. Brands with ≥2 offers only.","kpi":{"rise":{"val":"+7.4%","sub":"Subaru"},"fall":{"val":"−1.4%","sub":"Citroën"},"avg":{"val":"+1.7%","sub":"226 offers analysed"}},"brand":{"labels":["SUBARU","FIAT","PEUGEOT","CUPRA","OPEL","CITROEN"],"values":[7.38,6.91,1.9,0.69,-0.01,-1.4],"n":[2,36,93,3,53,36]},"energy":{"labels":["PHEV","PETROL","DIESEL","ELECTRIC"],"values":[9.84,2.94,0.52,-0.2],"n":[22,59,18,127]}}};
var eyeCountry='FR',eyeView='brand',eyeExpanded={},eyeChart=null,eyeRows=[];
var EYE_CI='#55F8DD',EYE_CD='#8100FF';
var EYE_FONT="'Inter',-apple-system,Helvetica,Arial,sans-serif";

function eyeGrad(ctx,v){
  var w=ctx.canvas.width;
  var g=ctx.createLinearGradient(v>=0?0:w,0,v>=0?w:0,0);
  g.addColorStop(0,'rgba(200,200,220,0.28)');
  g.addColorStop(1,v>=0?EYE_CI:EYE_CD);
  return g;
}
function eyeIsNZ(v){return Math.abs(v)<0.05;}

function eyeBuildEnergyRows(){
  var ed=eyeD[eyeCountry].energy;
  var items=ed.labels.map(function(l,i){return{l:l,v:ed.values[i],n:ed.n[i]};})
    .sort(function(a,b){return b.v-a.v;});
  var rows=[];
  items.forEach(function(e){
    var disp=eyeIsNZ(e.v)?(e.v>=0?0.12:-0.12):e.v;
    rows.push({label:(eyeExpanded[e.l]?'\u25be ':'\u25b8 ')+e.l,
               value:disp,rawV:e.v,n:e.n,type:'energy',energy:e.l,nz:eyeIsNZ(e.v)});
    if(eyeExpanded[e.l]){
      (eyeBE[eyeCountry][e.l]||[]).slice().sort(function(a,b){return b.v-a.v;})
        .forEach(function(b){
          rows.push({label:'   '+b.brand,value:b.v,rawV:b.v,
                     n:b.n,type:'brand',energy:e.l,nz:false});
        });
    }
  });
  return rows;
}

function eyeChartH(n){
  var mob=window.innerWidth<=600,rh=mob?34:42;
  if(eyeView==='brand') return Math.max(mob?180:300,n*rh);
  return Math.max(160,n*rh);
}

var eyePlugClick={id:'eyePlugClick',afterEvent:function(ch,args){
  if(eyeView!=='energy') return;
  var e=args.event;
  if(e.type!=='click'||e.x>ch.chartArea.left) return;
  var ys=ch.scales.y;if(!ys)return;
  for(var i=0;i<ys.ticks.length;i++){
    if(Math.abs(e.y-ys.getPixelForTick(i))<18){
      var row=eyeRows[i];
      if(row&&row.type==='energy'){
        var was=!!eyeExpanded[row.energy];
        eyeExpanded={};
        if(!was)eyeExpanded[row.energy]=true;
        eyeBuild();
      }
      break;
    }
  }
}};

var eyePlugHover={id:'eyePlugHover',afterEvent:function(ch,args){
  if(eyeView!=='energy')return;
  var e=args.event;if(e.type!=='mousemove')return;
  var ys=ch.scales.y;if(!ys)return;
  var cur='default';
  if(e.x<=ch.chartArea.left){
    for(var i=0;i<ys.ticks.length;i++){
      if(Math.abs(e.y-ys.getPixelForTick(i))<18&&eyeRows[i]&&eyeRows[i].type==='energy'){
        cur='pointer';break;
      }
    }
  }
  ch.canvas.style.cursor=cur;
}};

var eyePlugDot={id:'eyePlugDot',afterDatasetsDraw:function(ch){
  if(eyeView!=='energy')return;
  var ctx=ch.ctx,meta=ch.getDatasetMeta(0);
  meta.data.forEach(function(bar,i){
    var row=eyeRows[i];
    if(!row||!row.nz||row.type!=='energy')return;
    var x0=ch.scales.x.getPixelForValue(0);
    ctx.save();ctx.beginPath();
    ctx.arc(x0,bar.y,4,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.75)';
    ctx.fill();ctx.restore();
  });
}};

function eyeBuild(){
  if(eyeView==='energy'){
    eyeRows=eyeBuildEnergyRows();
  }else{
    var bd=eyeD[eyeCountry].brand;
    eyeRows=bd.labels.map(function(l,i){
      return{label:l,value:bd.values[i],rawV:bd.values[i],n:bd.n[i],type:'brand',nz:false};
    }).sort(function(a,b){return a.value-b.value;});
  }
  var labels=eyeRows.map(function(r){return r.label;});
  var values=eyeRows.map(function(r){return r.value;});
  var rawVs =eyeRows.map(function(r){return r.rawV;});
  var ns    =eyeRows.map(function(r){return r.n;});
  var types =eyeRows.map(function(r){return r.type;});
  var hint=document.getElementById('eye-hint');
  if(hint)hint.style.display=(eyeView==='energy')?'flex':'none';
  var wrap=document.getElementById('eye-chart-wrap');
  if(wrap)wrap.style.height=eyeChartH(eyeRows.length)+'px';
  if(eyeChart){eyeChart.destroy();eyeChart=null;}
  var canvas=document.getElementById('eyeChart');
  if(!canvas)return;
  eyeChart=new Chart(canvas,{
    type:'bar',
    data:{labels:labels,datasets:[{
      data:values,
      backgroundColor:function(c){
        if(eyeRows[c.dataIndex]&&eyeRows[c.dataIndex].nz)return 'transparent';
        return eyeGrad(c.chart.ctx,rawVs[c.dataIndex]);
      },
      borderRadius:5,maxBarThickness:eyeView==='brand'?28:30,
      barPercentage:0.72,minBarLength:0
    }]},
    options:{
      indexAxis:'y',responsive:true,maintainAspectRatio:false,onClick:null,
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'rgba(10,8,28,.96)',
          borderColor:'rgba(255,255,255,.12)',borderWidth:1,
          titleColor:'#fff',bodyColor:'rgba(255,255,255,.55)',
          titleFont:{family:EYE_FONT,size:12,weight:'500'},
          bodyFont:{family:EYE_FONT,size:12},
          callbacks:{
            title:function(it){
              return labels[it[0].dataIndex].replace(/^[\u25be\u25b8]\s*/,'').trim();
            },
            label:function(c){
              var v=rawVs[c.dataIndex],n=ns[c.dataIndex];
              return(v>=0?'+':'')+v.toFixed(1)+'%  ('+n+' offers)';
            }
          }
        }
      },
      scales:{
        x:{
          grid:{color:'rgba(255,255,255,.07)'},
          border:{color:'rgba(255,255,255,.08)'},
          ticks:{color:'rgba(255,255,255,.40)',font:{family:EYE_FONT,size:11},
            callback:function(v){return(v>0?'+':'')+parseFloat(v).toFixed(0)+'%';}}
        },
        y:{
          grid:{display:false},border:{color:'rgba(255,255,255,.08)'},
          ticks:{
            color:function(c){
              if(eyeView!=='energy')return 'rgba(255,255,255,.85)';
              return types[c.index]==='energy'?EYE_CI:'rgba(255,255,255,.72)';
            },
            font:function(c){
              if(eyeView!=='energy')return{family:EYE_FONT,size:12,weight:'500'};
              return types[c.index]==='energy'
                ?{family:EYE_FONT,size:12,weight:'600'}
                :{family:EYE_FONT,size:11,weight:'400'};
            }
          }
        }
      }
    },
    plugins:[eyePlugClick,eyePlugHover,eyePlugDot]
  });
}

function eyeUpdateKpis(){
  var k=eyeD[eyeCountry].kpi;
  document.getElementById('eyeKRV').textContent=k.rise.val;
  document.getElementById('eyeKRS').textContent=k.rise.sub;
  document.getElementById('eyeKFV').textContent=k.fall.val;
  document.getElementById('eyeKFS').textContent=k.fall.sub;
  document.getElementById('eyeKAV').textContent=k.avg.val;
  document.getElementById('eyeKAS').textContent=k.avg.sub;
  document.getElementById('eye-subtitle').textContent=eyeD[eyeCountry].subtitle;
  document.getElementById('eye-footnote').textContent=eyeD[eyeCountry].footnote;
}

function eyeSetOn(id,on){
  var el=document.getElementById(id);
  if(!el)return;
  if(on)el.classList.add('eye-on');
  else  el.classList.remove('eye-on');
}

function eyeAttach(){
  var ids=['eyeBtnFR','eyeBtnDE','eyeBtnBrand','eyeBtnEnergy'];
  for(var i=0;i<ids.length;i++){if(!document.getElementById(ids[i])){setTimeout(eyeAttach,60);return;}}
  document.getElementById('eyeBtnFR').addEventListener('click',function(){
    eyeCountry='FR';eyeExpanded={};
    eyeSetOn('eyeBtnFR',true);eyeSetOn('eyeBtnDE',false);
    eyeUpdateKpis();eyeBuild();
  });
  document.getElementById('eyeBtnDE').addEventListener('click',function(){
    eyeCountry='DE';eyeExpanded={};
    eyeSetOn('eyeBtnFR',false);eyeSetOn('eyeBtnDE',true);
    eyeUpdateKpis();eyeBuild();
  });
  document.getElementById('eyeBtnBrand').addEventListener('click',function(){
    eyeView='brand';eyeExpanded={};
    eyeSetOn('eyeBtnBrand',true);eyeSetOn('eyeBtnEnergy',false);
    eyeBuild();
  });
  document.getElementById('eyeBtnEnergy').addEventListener('click',function(){
    eyeView='energy';eyeExpanded={};
    eyeSetOn('eyeBtnBrand',false);eyeSetOn('eyeBtnEnergy',true);
    eyeBuild();
  });
}

function eyeInit(){
  if(typeof Chart==='undefined'){setTimeout(eyeInit,80);return;}
  eyeUpdateKpis();
  eyeBuild();
  eyeAttach();
}
eyeInit();
