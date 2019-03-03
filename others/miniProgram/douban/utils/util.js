const processSubject = (subject) => {
  var title = subject.title;
  var directors = subject.directors;
  var directorStr = '';
  for (var index in directors) {
    directorStr = directorStr + directors[index].name + ' / ';
  }
  if (directorStr != '') {
    directorStr = directorStr.substring(0, directorStr.length - 2);
  }

  var casts = subject.casts;
  var castStr = '';
  for (var index in casts) {
    castStr = castStr + casts[index].name + ' / ';
  }
  if (castStr != '') {
    castStr = castStr.substring(0, castStr.length - 2);
  }


  var genres = subject.genres;
  var genreStr = '';
  for (var index in genres) {
    genreStr = genreStr + genres[index] + ' / ';
  }
  if (genreStr != '') {
    genreStr = genreStr.substring(0, genreStr.length - 2);
  }
  var text = '电影名字：' + title + '\n 导演：' + directorStr + '\n 演员：' + castStr + '\n 类型：' + genreStr + '\n 上映年份：' + subject.year + '';
  subject.text = text;
}
const processSubjects = (subjects) => {
  for (var i = 0; i < subjects.length; i++) {
    var subject = subjects[i];
    processSubject(subject);
  }
}

module.exports = {
  processSubjects: processSubjects,
  processSubject: processSubject
}
