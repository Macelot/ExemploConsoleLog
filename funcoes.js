/* dump1() retorna, em forma de alertas o conteudo recebido por parâmetro, letra por letra ou obj por obj.
* Note que podemos passar por parâmetro uma variável ou um array
* parâmetro obj = nossa variável a ser debugada
* retorna null, apenas faz alertas
*/ 

function dump1(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
    alert(out);
}

/* dump2() retorna, em forma de string o conteudo recebido por parâmetro.
* Nesta função podemos enviar dois parâmetros
* parâmetro v = nossa variável a ser debugada
* parâmetro s = quantidade de elementos que desejamos debugar 
* retorna string
*/        
function dump2(v, s) {
    s = s || 1;
    var t = '';
    switch (typeof v) {
        case "object":
            t += "\n";
            for (var i in v) {
                t += Array(s).join(" ")+i+": ";
                t += dump2(v[i], s+3);
            }
            break;
       default: //number, string, boolean, null, undefined 
        t += v+" ("+typeof v+")\n";
        break;
    }
    return t;
}

/*
dump() displays the contents of a variable like var_dump() does in PHP. dump() is
better than typeof, because it can distinguish between array, null and object.  
Parameters:
  v:              The variable
  howDisplay:     "none", "body", "alert" (default)
  recursionLevel: Number of times the function has recursed when entering nested
                  objects or arrays. Each level of recursion adds extra space to the 
                  output to indicate level. Set to 0 by default.
Return Value:
  A string of the variable's contents 
Limitations:
  Can't pass an undefined variable to dump(). 
  dump() can't distinguish between int and float.
  dump() can't tell the original variable type of a member variable of an object.
  These limitations can't be fixed because these are *features* of JS. However, dump()
*/
function dump(v, howDisplay, recursionLevel) {
    howDisplay = (typeof howDisplay === 'undefined') ? "alert" : howDisplay;
    recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;
    var vType = typeof v;
    var out = vType;
    switch (vType) {
        case "number":
            /* there is absolutely no way in JS to distinguish 2 from 2.0
            so 'number' is the best that you can do. The following doesn't work:
            var er = /^[0-9]+$/;
            if (!isNaN(v) && v % 1 === 0 && er.test(3.0))
                out = 'int';*/
        case "boolean":
            out += ": " + v;
            break;
        case "string":
            out += "(" + v.length + '): "' + v + '"';
            break;
        case "object":
            //check if null
            if (v === null) {
                out = "null";

            }
            //If using jQuery: if ($.isArray(v))
            //If using IE: if (isArray(v))
            //this should work for all browsers according to the ECMAScript standard:
            else if (Object.prototype.toString.call(v) === '[object Array]') {  
                out = 'array(' + v.length + '): {\n';
                for (var i = 0; i < v.length; i++) {
                    out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " + 
                        dump(v[i], "none", recursionLevel + 1) + "\n";
                }
                out += repeatString('   ', recursionLevel) + "}";
            }
            else { //if object    
                sContents = "{\n";
                cnt = 0;
                for (var member in v) {
                    //No way to know the original data type of member, since JS
                    //always converts it to a string and no other way to parse objects.
                    sContents += repeatString('   ', recursionLevel) + "   " + member +
                        ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
                    cnt++;
                }
                sContents += repeatString('   ', recursionLevel) + "}";
                out += "(" + cnt + "): " + sContents;
            }
            break;
    }

    if (howDisplay == 'body') {
        var pre = document.createElement('pre');
        pre.innerHTML = out;
        document.body.appendChild(pre)
    }
    else if (howDisplay == 'alert') {
        //alert(out);
    }

    return out;
}

/* repeatString() retorna uma string repetidas vezes conforme o parâmetro num
* parâmetro str = nossa variável a ser repetida
* parâmetro num = quantas vezes desejamos repetir a string original
* retorna string
*/ 
function repeatString(str, num) {
    out = '';
    for (var i = 0; i < num; i++) {
        out += str; 
    }
    return out;
}

//Criar a documentação :)

function distLatLong(lat1,lon1,lat2,lon2) {
	var R = 6371; // raio da terra
	var Lati = Math.PI/180*(lat2-lat1);  //Graus  - > Radianos
	var Long = Math.PI/180*(lon2-lon1);
	var a =
		Math.sin(Lati/2) * Math.sin(Lati/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(Long/2) * Math.sin(Long/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c * 1000; // distância en km
	return d;
}

function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function transforma_tempos(s){
	horas = Math.floor(s / 3600);
	minutos =  Math.floor((s - (horas * 3600)) / 60);
	segundos =  Math.floor(s % 60);
	formatado = addZero(Math.round(horas))+":"+addZero(minutos)+":"+addZero(segundos);
    return formatado;
}
function abreLinkPopUp(onde){
	pagina=onde;
	abriu=true;
	window.open(pagina);
}
function addslashes(ch) {
	ch = ch.toString().replace('Passo d\'Areia','Passo d\\\'Areia');
	return ch
}
function capital_letter(str) {
    str = str.split(" ");
	arr = str.filter(Boolean);
    for (var i = 0, x = arr.length; i < x; i++) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1).toLowerCase();
    }
	tudo=arr.join(" ");
    return tudo;
}
