<DOCTYPE html>
<html class="no-js" lang="en">
<head>
<title>Techer Student Class Check</title>
<link rel="stylesheet" type="text/css" href="Styles/CreateClassesStyle.css">

</head>
<body>
<font face = "Verdana">
<div style="background-color:White;width:60%;height:auto; margin-left:20%; border:1px solid black;padding:15px;">
<img src="images/HPSSLogo.png" alt="HPSS Logo" style="height: 100px">
<p><form>
  <h1><font face ="Verdana">Class Submissions</font></h1>
  Class Name:<br>
  <input class="ClassandTeachers" type="text" name="firstname"><br><br>
  Teacher 1:<br>
  <input class="ClassandTeachers" type="text" name="lastname"><br><br>
  Teacher 2:<br>
  <input class="ClassandTeachers" type="text" name="lastname"><br><br>
  Kamar Code:<br>
  <input class="ClassandTeachers" type="text" name="lastname"><br><br>
    Class Description:<br>
  <textarea class="TextAreas" type="text" name="Description" placeholder="Write discription.."></textarea><br><br>
  
</form><br>
<div class="row">
      <div class="classtype">
        <label for="ClassType">Class Type</label>
      </div>
      <div class="dropdown">
        <select id="ClassType" name="ClassType">
          <option value="Module">Module</option>
          <option value="Spin">Spin</option>
          <option value="Floortime">Floortime</option>
          <option value="Projects">Projects</option>
        </select>
      </div>
    </div>
<br><br>

<div class="row">
      <div class="ClassSubject">
        <label for="ClassSubject">Class Subject 1</label>
      </div>
      <div class="dropdown">
        <select id="ClassSubject" name="ClassSubject">
          <option value="None"></option>
          <option value="Maths">Maths</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
          <option value="Health/P.E">Health/P.E</option>
          <option value="Technology">Technology</option>
          <option value="Other..">Other..</option>
        </select>
      </div>
    </div>
<br><br>
<div class="row">
      <div class="ClassSubject">
        <label for="ClassSubject">Class Subject 2</label>
      </div>
      <div class="dropdown">
        <select id="ClassSubject" name="ClassSubject">
          <option value="None">None</option>
          <option value="Maths">Maths</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
          <option value="Health/P.E">Health/P.E</option>
          <option value="Technology">Technology</option>
          <option value="Other..">Other..</option>
        </select>
      </div>
    </div>
<br><br>

<button id="bigboibutton" class="button" onclick="alert('Class Submitted. You may close the page.')">Submit</button>
<!--<button type="button" onclick="alert('Class Submitted')">Submit</button></p>      *don't need this anymore but pls don't remove*
</div>-->
</font>
</body>
</html>