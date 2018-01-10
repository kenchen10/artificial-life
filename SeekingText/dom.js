function dom() {
  //create buttons
  var home = select('#homeButton');
  var about = select('#aboutButton');
  var contact = select('#contactButton');
  var projects = select('#projectsButton');
  var resume = select('#resumeButton');
  //define mousepress actions
  home.mousePressed(homeStyle);
  about.mousePressed(aboutStyle);
  contact.mousePressed(contactStyle);
  projects.mousePressed(projectsStyle);
  resume.mousePressed(resumeStyle);
  //button size
  home.style('font-size', windowWidth / 70);
  about.style('font-size', windowWidth / 70);
  contact.style('font-size', windowWidth / 70);
  projects.style('font-size', windowWidth / 70);
  resume.style('font-size', windowWidth / 70);
}
//changes state based on button press
function homeStyle() {
  changeState(txt1);
}

function aboutStyle() {
  changeState(txt2);
}

function contactStyle() {
  changeState(txt3);
}

function projectsStyle() {
  changeState(txt4);
}

function resumeStyle() {
  changeState(txt5);
}
