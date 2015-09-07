// ==UserScript==
// @name         Content tracker
// @namespace    http://www.fyens.dk/
// @version      1.0-beta1
// @description  Client site content tracker demo.
// @author       Peytz
// @match        http://www.fyens.dk/*
// @grant        none
// @require      https://raw.githubusercontent.com/cricunova/content_tracker/master/SharedCount.js
// ==/UserScript==
var pageHeight = jQuery('body').height();
var pageWidth = jQuery('body').width();
var styles = '<style>' +
  '#orange-bar {width: 100px; height: ' + pageHeight + 'px; position: absolute; top: 0; left: 0; background-color: #ff9900; z-index: 9999999999; text-align: center;} ' +
  '#orange-bar-person {text-align: center; cursor: pointer; margin: 20px 10px 10px;} ' +
  '#orange-bar-group {text-align: center; cursor: pointer; margin: 10px; padding-bottom: 20px; border-bottom: 2px solid #ffffff;} ' +
  '#orange-bar-watchers, #orange-bar-facebook, #orange-bar-tweeter, #orange-bar-linkedin {text-align: center; margin: 10px; padding-bottom: 20px; border-bottom: 2px solid #ffffff;} ' +
  '#orange-bar-back {text-align: center; cursor: pointer; margin: 20px 10px 10px;} ' +
  '#orange-bar p {color: white; font-weight: bold; padding: 5px 0;} ' +
  '#overview-tables-page-personal, #overview-tables-page-group {width: ' + (pageWidth-140) + 'px; height: ' + pageHeight + 'px; position: absolute; top: 0; left: 100px; z-index: 9999999999; background: white; padding: 20px;} ' +
  '.overview-tables-page-header {width: 100%; clear: both; padding-bottom: 20px; border-bottom: 1px solid #999999; } ' +
  '.overview-tables-page-header p {font-weight: bold; font-size: 18px;} ' +
  '.overview-tables-page-header p.numeric {font-size: 25px;} ' +
  '.overview-tables-page-header p.percentage {font-size: 30px;} ' +
  '.overview-tables-page-header-section-info {display: inline-block; text-align: center; padding: 40px 60px;} ' +
  '.overview-tables-page-header-general-info {border: 1px solid; display: inline-block; text-align: ceter; padding-right: 50px;} ' +
  '.general-info-virality, .general-info-social-visits {display: inline-block; padding: 40px 10px 40px 60px;} ' +
  '.general-arrow-virality, .general-arrow-social-visits {display: inline-block; padding: 20px 10px} ' +
  '.general-arrow-virality img, .general-arrow-social-visits img {height: 60px; width: auto;} ' +
  '#overview-tables-page-personal h3, #overview-tables-page-group h3 {font-size: 18px; text-align: center; padding-bottom: 10px;} ' +
  '#overview-tables-page-personal h3 img, #overview-tables-page-group h3 img {height: 18px; padding: 0 10px;} ' +
  '#overview-tables-page-personal table tr.odd, #overview-tables-page-group table tr.odd {background-color: #eeeeee} ' +
  '#overview-tables-page-personal table td, #overview-tables-page-group table td {border: 1px solid; border-collapse: collapse; padding: 5px; vertical-align: middle; text-align: center; font-weight: bold;} ' +
  '#overview-tables-page-personal table thead td, #overview-tables-page-group table thead td {background-color: #333333;} ' +
  '#overview-tables-page-personal table .viral, #overview-tables-page-group table .viral {color: white; background-color: red; padding: 2px 10px; border: 1px solid #666666; font-size: 10px; font-weight: bold;} ' +
  '#overview-tables-page-personal table tbody img, #overview-tables-page-group table tbody img {height: 14px; vertical-align: middle;} ' +
  '#overview-tables-page-personal table tbody p, #overview-tables-page-group table tbody p {line-height: 18px; font-weight: bold; text-align: left;} ' +
  '#overview-tables-page-personal table tbody a, #overview-tables-page-group table tbody a {font-weight: normal; text-decoration: underline;} ' +
  '#overview-tables-page-personal span.watches, #overview-tables-page-group span.watches {display: inline-block; width: 50px;} ' +
  '#overview-tables-page-personal span.social-percent, #overview-tables-page-group span.social-percent {display: inline-block; width: 100px;} ' +
  '.overview-first-table, .overview-second-table {float: left; margin: 20px; 10px}' +
  '</style>';
var orangeBar = '<div id="orange-bar">' +
  '<div id="orange-bar-person">' +
  '<img src="http://i.imgsafe.org/0d7363e.png" />' +
  '</div>' +
  '<div id="orange-bar-group">' +
  '<img src="http://i.imgsafe.org/10a889a.png" />' +
  '</div>' +
  '<div id="orange-bar-watchers">' +
  '<img src="http://i.imgsafe.org/0ac88b4.png" />' +
  '<p>8.587</p>' +
  '<p>Social: 40%</p>' +
  '</div>' +
  '<div id="orange-bar-facebook">' +
  '<img src="http://i.imgsafe.org/1156fdc.png" />' +
  '<p>Share: <span id="fb-orangebar-share">0</span></p>' +
  '<p>Like: <span id="fb-orangebar-like">0</span></p>' +
  '<p>Com.: <span id="fb-orangebar-comment">0</span></p>' +
  '</div>' +
  '<div id="orange-bar-tweeter">' +
  '<img src="http://i.imgsafe.org/0b9c7e3.png" />' +
  '<p>Retweets: <span id="tw-orangebar-tweets">0</span></p>' +
  '</div>' +
  '<div id="orange-bar-linkedin">' +
  '<img src="http://i.imgsafe.org/0ef1a93.png" />' +
  '<p>Share: <span id="ln-orangebar-share">0</span></p>' +
  '</div>' +
  '<div id="orange-bar-google">' +
  '<img src="http://i.imgsafe.org/3c91673.png" />' +
  '<p>PlusOnes: <span id="g-orangebar-plusone">0</span></p>' +
  '</div>' +
  '</div>';
var orangeBarPersonal = '<div id="orange-bar">' +
  '<div id="orange-bar-person">' +
  '<img src="http://i.imgsafe.org/0c7fd68.png" />' +
  '<p style="color: #666666;">Mig</p>' +
  '</div>' +
  '<div id="orange-bar-group">' +
  '<img src="http://i.imgsafe.org/10a889a.png" />' +
  '<p>Mit team</p>' +
  '</div>' +
  '<div id="orange-bar-back">' +
  '<img src="http://i.imgsafe.org/12f307d.png" />' +
  '</div>' +
  '</div>';
var orangeBarGroup = '<div id="orange-bar">' +
  '<div id="orange-bar-person">' +
  '<img src="http://i.imgsafe.org/0d7363e.png" />' +
  '<p>Mig</p>' +
  '</div>' +
  '<div id="orange-bar-group">' +
  '<img src="http://i.imgsafe.org/0fda054.png" />' +
  '<p style="color: #666666;">Mit team</p>' +
  '</div>' +
  '<div id="orange-bar-back">' +
  '<img src="http://i.imgsafe.org/12f307d.png" />' +
  '</div>' +
  '</div>';
var overviewPersonal = '<div id="overview-tables-page-personal">' +
  '<div class="overview-tables-page-header">' +
  '<div class="overview-tables-page-header-section-info">' +
  '<p>Bo Mikael</p>' +
  '<p class="numeric">1/6-30/6</p>' +
  '</div>' +
  '<div class="overview-tables-page-header-general-info">' +
  '<div class="general-info-virality">' +
  '<p>Virality</p>' +
  '<p class="percentage">53%</p>' +
  '</div>' +
  '<div class="general-arrow-virality">' +
  '<img src="http://i.imgsafe.org/8742f1d.png" />' +
  '</div>' +
  '<div class="general-info-social-visits">' +
  '<p>Social visits</p>' +
  '<p class="percentage">21%</p>' +
  '</div>' +
  '<div class="general-arrow-social-visits">' +
  '<img src="http://i.imgsafe.org/862aee9.png" />' +
  '</div>' +
  '</div>' +
  '</div>' +
  '<div class="personal-first-table overview-first-table">' +
  '<h3><img src="http://i.imgsafe.org/e4c9011.png" />1/6 - 30/6<img src="http://i.imgsafe.org/e587464.png" /></h3>' +
  '<table>' +
  '<thead>' +
  '<tr>' +
  '<td></td>' +
  '<td><img src="http://i.imgsafe.org/5320b9f.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/4db9beb.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/517a603.png" /></td>' +
  '</tr>' +
  '</thead>' +
  '<tbody>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Daginstitution indstillet til lukning...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.006</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp45%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;387&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;57</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '</tbody>' +
  '</table>' +
  '</div>' +
  '<div class="personal-second-table overview-second-table">' +
  '<h3>TOPLISTE</h3>' +
  '<table>' +
  '<thead>' +
  '<tr>' +
  '<td></td>' +
  '<td><img src="http://i.imgsafe.org/5320b9f.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/4db9beb.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/517a603.png" /></td>' +
  '</tr>' +
  '</thead>' +
  '<tbody>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;30&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;16&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;63</td>' +
  '<td>7</td>' +
  '<td>4</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;42&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;15&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;75</td>' +
  '<td>13</td>' +
  '<td>6</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;14&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;86&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;8</td>' +
  '<td>9</td>' +
  '<td>67</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;63&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;5&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;7</td>' +
  '<td>2</td>' +
  '<td>4</td>' +
  '</tr>' +
  '</tbody>' +
  '</table>' +
  '</div>' +
  '</div>';
var overviewGroup = '<div id="overview-tables-page-group">' +
  '<div class="overview-tables-page-header">' +
  '<div class="overview-tables-page-header-section-info">' +
  '<p>Sport</p>' +
  '<p class="numeric">1/6-30/6</p>' +
  '</div>' +
  '<div class="overview-tables-page-header-general-info">' +
  '<div class="general-info-virality">' +
  '<p>Virality</p>' +
  '<p class="percentage">48%</p>' +
  '</div>' +
  '<div class="general-arrow-virality">' +
  '<img src="http://i.imgsafe.org/8742f1d.png" />' +
  '</div>' +
  '<div class="general-info-social-visits">' +
  '<p>Social visits</p>' +
  '<p class="percentage">14%</p>' +
  '</div>' +
  '<div class="general-arrow-social-visits">' +
  '<img src="http://i.imgsafe.org/862aee9.png" />' +
  '</div>' +
  '</div>' +
  '</div>' +
  '<div class="group-first-table overview-first-table">' +
  '<h3><img src="http://i.imgsafe.org/e4c9011.png" />1/6 - 30/6<img src="http://i.imgsafe.org/e587464.png" /></h3>' +
  '<table>' +
  '<thead>' +
  '<tr>' +
  '<td></td>' +
  '<td><img src="http://i.imgsafe.org/5320b9f.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/4db9beb.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/517a603.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/5fc6073.png" /></td>' +
  '</tr>' +
  '</thead>' +
  '<tbody>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Daginstitution indstillet til lukning...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.006</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp45%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '</tbody>' +
  '</table>' +
  '</div>' +
  '<div class="group-second-table overview-second-table">' +
  '<h3>TOPLISTE</h3>' +
  '<table>' +
  '<thead>' +
  '<tr>' +
  '<td></td>' +
  '<td><img src="http://i.imgsafe.org/5320b9f.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/4db9beb.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/517a603.png" /></td>' +
  '<td><img src="http://i.imgsafe.org/5fc6073.png" /></td>' +
  '</tr>' +
  '</thead>' +
  '<tbody>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Daginstitution indstillet til lukning...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.006</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp45%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">OUH: Truckere gav penge til syge børn...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">7.003</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp18%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;56&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;7&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;1</td>' +
  '<td>8</td>' +
  '<td>25</td>' +
  '<td>KB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">Fyns Politi tjekker Odenses karrusel...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">5.007</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp17%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;25&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;5</td>' +
  '<td>12</td>' +
  '<td>3</td>' +
  '<td>BM</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Gerningsmanden kan slippe uden straf...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">10.523</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp33%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;43&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;12&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>8</td>' +
  '<td>2</td>' +
  '<td>OB</td>' +
  '</tr>' +
  '<tr class="odd">' +
  '<td><p><a href="#">814 deltog i det femte Pulsløb i Assens...</a></p><p><img src="http://i.imgsafe.org/fed2c90.png" />&nbsp;<span class="watches">12.578</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp42%</span>&nbsp;&nbsp;</p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;67&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;10</td>' +
  '<td>6</td>' +
  '<td>25</td>' +
  '<td>JP</td>' +
  '</tr>' +
  '<tr class="even">' +
  '<td><p><a href="#">Langelandsbroen skal repareres igen...</a></p><p><img src="http://i.imgsafe.org/53cdf5d.png" />&nbsp;<span class="watches">8.789</span>&nbsp;&nbsp;<span class="social-percent">Social:&nbsp10%</span>&nbsp;&nbsp;<span class="viral">VIRAL</span></p></td>' +
  '<td><img src="http://i.imgsafe.org/d1de362.png" />&nbsp;89&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/d2b3f02.png" />&nbsp;9&nbsp;&nbsp;&nbsp;<img src="http://i.imgsafe.org/e160038.png" />&nbsp;2</td>' +
  '<td>89</td>' +
  '<td>25</td>' +
  '<td>CE</td>' +
  '</tr>' +
  '</tbody>' +
  '</table>' +
  '</div>' +
  '</div>';


jQuery('head').append(styles);
jQuery('body').prepend(orangeBar);
jQuery(document).on('click', '#orange-bar-person', function() {
    jQuery('#orange-bar').remove();
    if (jQuery('#overview-tables-page-group').length > 0) {
        jQuery('#overview-tables-page-group').remove();
    }
    if (jQuery('#overview-tables-page-personal').length == 0) {
        jQuery('body').prepend(overviewPersonal);
    }
    jQuery('body').prepend(orangeBarPersonal);
});
jQuery(document).on('click', '#orange-bar-group', function() {
    jQuery('#orange-bar').remove();
    if (jQuery('#overview-tables-page-personal').length > 0) {
        jQuery('#overview-tables-page-personal').remove();
    }
    if (jQuery('#overview-tables-page-group').length == 0) {
        jQuery('body').prepend(overviewGroup);
    }
    jQuery('body').prepend(orangeBarGroup);
});
jQuery(document).on('click', '#orange-bar-back', function() {
    jQuery('#orange-bar').remove();
    if (jQuery('#overview-tables-page-group').length > 0) {
        jQuery('#overview-tables-page-group').remove();
    }
    if (jQuery('#overview-tables-page-personal').length > 0) {
        jQuery('#overview-tables-page-personal').remove();
    }
    jQuery('body').prepend(orangeBar);
});
jQuery.sharedCount(location.href, function(data){
    jQuery("#fb-orangebar-share").text(data.Facebook.share_count);
    jQuery("#fb-orangebar-like").text(data.Facebook.like_count);
    jQuery("#fb-orangebar-comment").text(data.Facebook.comment_count);
    jQuery("#tw-orangebar-tweets").text(data.Twitter);   
    jQuery("#ln-orangebar-share").text(data.LinkedIn);
    jQuery("#g-orangebar-plusone").text(data.GooglePlusOne);
});

