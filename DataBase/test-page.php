<script>
  document.getElementById(container).innerhtml="itworks!";
</script>
<?php

$USER = 'select_insert';
$PSWD = 'hpss2014edge2018';
$HOST = 'localhost';
$NAME = 'hpss_classes';

$dbconnect = mysqli_connect("$HOST", "$USER", "$PSWD", "$NAME");

if (!$dbconnect) {
die('fail');
}

$result = mysqli_query($dbconnect, "select code, name, type from classes");
//echo mysqli_query($dbconnect,"SELECT * FROM classes");
while ($row = mysqli_fetch_array($result)){

  //echo $row;

    echo'  <!doctype HTML>
      <html>
      <head>
        <title> &nbsp </title>
      </head>
      <body>
      <div id="container" style="height: auto; margin-left: 20%; width: 60%; background-color: #eeeeee;">
        <h1 style="height: auto; margin: 0; background-color: #444444;">
      ';
    echo $row['code'];
    echo '
        </h1>
        <p style="height: auto; margin: 0; height: 200px; background-color: #aaaaaa;">
    ';
    echo $row["type"];
    echo'
          </p>
          <script> dpcument.getElementById("container").innerhtml = "ITWORKS"; </script>
        </div>
        </body>
        </html>
        ';





  // echo $row['code'];
  // echo '<br>';
  // echo $row['name'];
  // echo $row['type'];

}
?>
