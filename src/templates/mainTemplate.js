/**
 * Hold the main template: the basis for all other stuff
 */
export default class mainTemplate {
    constructor(){

    }

    render(texts, data) {
        let content=`
            <div class="topContainer">
                <div class="title">
                    <h1 ds="titel">${texts.titel}</h1>
                </div>
            </div>
            <h2 ds="subtitel">${texts.subtitel}</h2>
            <div class="lists">
            <div class="searchDiv">
                <h4 ds="searchText">${texts.searchText}</h4>
                <input id="searchBar" type="text" placeholder="Skriv uddannelse"><div class="topDiv" >
                    <ul class='topCategory' id="searchResults">
                    </ul>
                </div>
            </div>
            <h4 ds="listText">${texts.listText}</h4>

        `;

            Object.keys(data).forEach((xx, i) => {
                content += `<div><h3 class="h3${i}">${xx}</h3><div class="topDiv">`;
                content += "<ul class='topCategory'>";

                content += "<li>";
                content += `<div class="legend"><span ds="introText">${texts.introText}</span><div><span class="mobileLegend">&nbsp;</span><span ds="introText4">${texts.introText4}</span><span class="mobileLegend">&nbsp;</span><span ds="introText3">${texts.introText3}</span><span class="mobileLegend">&nbsp;</span><span ds="introText2">${texts.introText2}</span></div></div>`;
                content += "</li>";

                data[xx].forEach((yy) => {
                    content += "<li>";
                    content += `<div><span>${yy.n}</span><div><span ds="introText4" class="mobileLegend">${texts.introText4}</span>${this.pctData(yy.l)}<span ds="introText3" class="mobileLegend">${texts.introText3}</span>${this.formData(yy.m)}<span ds="introText2" class="mobileLegend">${texts.introText2}</span>${this.formData(yy.g)}</div></div>`;
                    content += "</li>";
                });
                content += "</ul>";
                content += `</div></div>`;
            }, this);

        content +=`
            </div>
            <div class="dbinfo">
                <b ds="sourceHeader">${texts.sourceHeader}</b><span ds="sourceContent">${texts.sourceContent}</span><br/>
                <b ds="pHeader">${texts.pHeader}</b><span ds="pContent">${texts.pContent}</span><br/>
                <div class="drlogo"></div>
                <b ds="gHeader">${texts.gHeader}</b><span ds="gContent">${texts.gContent}</span><br/>
            </div>
        `;

        return content;
    }

    formData(x){
        if (x != "-") {
            let s = x.toString();
            if (s.length >= 3) {
                s = s.substring(0,s.length-3) + "." + s.substring(s.length-3, s.length);
            }
            return "<span>" + (s) + " kr.</span>";
        } else {
            return "<span>" + (x) + "</span>";
        }
    }

    pctData(x) {
        if (x != "-") {
            return "<span>" + (x + "%") + "</span>";
        } else {
            return "<span>" + (x) + "</span>";
        }
    }

    searchHead(texts) {
        let content=`
        <li><div class="legend"><span ds="introText">${texts.introText}</span><div><span class="mobileLegend">&nbsp;</span><span ds="introText4">${texts.introText4}</span><span class="mobileLegend">&nbsp;</span><span ds="introText3">${texts.introText3}</span><span class="mobileLegend">&nbsp;</span><span ds="introText2">${texts.introText2}</span></div></div></li>`;

        return content;
    }

    searchResultTemplate(searchResult, texts) {
        let content = ``;
        for (let i=0, len = searchResult.length; i<len; i++) {
            content += "<li>";
            content += `<div><span>${searchResult[i][0].n}</span><div><span ds="introText4" class="mobileLegend">${texts.introText4}</span>${this.pctData(searchResult[i][0].l)}<span ds="introText3" class="mobileLegend">${texts.introText3}</span>${this.formData(searchResult[i][0].m)}<span ds="introText2" class="mobileLegend">${texts.introText2}</span>${this.formData(searchResult[i][0].g)}</div></div>`;
            content += "</li>";
        }

        return content;
    }

    searchEmpty(texts){
        let content=`
        <li>
            <div><span class="noResult"><b ds="noResult">${texts.noResult}</b></span</div>
        </li>
        <li>&nbsp;
        </li>
        `;

        return content;
    }
}