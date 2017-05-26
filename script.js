// main document ready function to check if dom is loaded fully or not
  $( document ).ready(function() {
    // initially hiding the content
    $("#about_me").hide();
    $("#feeds").hide();
    $("#dataplace").hide();
    $("#feedpage").hide();



    // access token passed as javascript variable, to load ifo for other user generate the access token and replace it here

    var myFacebookToken = 'EAACEdEose0cBAPv0Vegx4ndHaPAc1bQfFbYiRsYu5v7ymwLVZAkYm6hJt78rXZAPrIsPZBFc6wTNMpkYlhZC1eKLdgjyjXjkiWVZAPK7WKocm1GCSL2r2UeD1KjhWUJTCicAeZA9RkBt1MzZAUVhZAsLeQw5vkHhbBffIs9S4wCLRGevRYpqc9ezzeCXzkn2uDsZD ';





    function getFacebookInfo(){

        $.ajax('https://graph.facebook.com/me?access_token='+myFacebookToken,{

                success : function(response){
                  //adding user name to header
                    $("#myName").text(response.name);
                    //adding user emial id to the page
                    $("#email").text(response.email);
                    //adding user hometown to the page
                    $("#hometown").text(response.hometown.name);
                    //load the user unique facebook id
                    $("#userid").text(response.id);
                   
                    //accessing user id and call function to load profile picture and user posts
                    var id = response.id;
                    get_pic(id,myFacebookToken);
                    get_posts(myFacebookToken);







      //code to process the user dob and print it in the ddesired format
                    var k = response.birthday;
                    var mm;
                    var parts = k.split("/");
                    mm= parts[0];
                    var dd=parts[1];
                    var yy= parts[2];
        
                             switch(mm) {
                                 case "01":
                                    mm = "January";
                                    break;
                                 case "02":
                                    mm = "February";
                                    break;
                                 case "03":
                                    mm = "March";
                                    break;
                                 case "04":
                                    mm = "April";
                                    break;
                                 case "05":
                                    mm = "May";
                                    break;
                                 case "06":
                                    mm = "June";
                                    break;
                                 case "07":
                                    mm = "July";
                                    break;
                                 case "08":
                                    mm = "August";
                                    break;
                                 case "09":
                                    mm = "September";
                                    break;
                                 case "10":
                                    mm = "October";
                                    break;
                                 case "11":
                                    mm = "November";
                                    break;
                                 case "12":
                                    mm = "December";
                                    break;
                                 default:
                                    mm = "false date";
                              }


        
                  $("#bday").text(mm+" "+dd+", "+yy);

                   //code to fetch the education details
                  var m=response.education.length;
                  for(var i =0;i<m;i++)
                    {
                                        
                    var p = document.createTextNode(String(response.education[i].type));
                    var n = document.createTextNode(String(response.education[i].school.name));
                      
                    if((p == null||p==undefined) || (n== null ||n== undefined ))
                    {
                        //console.log("missing info");
                        alert("error encountered while fetching the education details");
                    }
                    else    
                        {
                                           
                            var para = document.createElement("P");
                            var brk = document.createElement("br");
                            para.appendChild(p);
                            para.appendChild(brk);
                            para.appendChild(n);
                    
                            document.getElementById("edu").appendChild(para);

                        }

                  }







                    
                }



            }//end argument list 
         
    


        );// end ajax call 
     $("#getInfoBtn").hide();
     $("#feeds").show();
     $("#dataplace").show();

    }// end get facebook info

    $("#getInfoBtn").on('click',getFacebookInfo);
    


  });
// function to show or hide elements baesd on navigation menu
function show_something()
{
  
   $("#feeds").hide();
   $("#row1").hide();
   $("#row2").hide();
   $("#row3").hide();
   $("#row4").hide();
   $("#about_me").show();
   $("#feedpage").show();
     
}
    


 function show_me(){

    $("#feedpage").hide();
    $("#feeds").show();
   $("#row1").show();
   $("#row2").show();
   $("#row3").show();
   $("#row4").show();
   $("#about_me").hide();

 }   

// function to acess user pic
 function get_pic(userid,token){

 
 $.ajax('https://graph.facebook.com/'+userid+'/picture?access_token='+token,{

       success : function(picdata){
                    
                     var img = document.createElement("img");
                     img.src = "https://graph.facebook.com/"+userid+"/picture?access_token="+token;
                     var src = document.getElementById("profile_pic");
                     src.appendChild(img);
                  
                    }

        }
  );


}

// function to fetch user posts limit made  to 10
function get_posts(token){

 
 $.ajax('https://graph.facebook.com/me?fields=posts.limit(10)&access_token='+token,{

       success : function(postdata){
            var abb = postdata.posts.data.length;                        
            str = "";
            
            for(i=0;i<abb;i++)
            {   
              //to fetch the date of the post
              var dat = new Date(postdata.posts.data[i].created_time);
              var nw_dt = dat.toDateString();
                          
                // to check if the posts is a of type status , photo or link
                if(postdata.posts.data[i]['type']=='status'|| postdata.posts.data[i]['type']=='link' || postdata.posts.data[i]['type']=='photo')
                {
                                            
                      //when post type is a status
                      if(postdata.posts.data[i]['type']=='status')
                        {                        
                             str = '<h5> Status updated on  :'+nw_dt+ '</h5>'
                                     + '<p>'+postdata.posts.data[i].message+'</p>'
                                     + '<hr/>';
                                     $("#newdata").append(str); 

                        }

                      //when post type is a link 
                      if(postdata.posts.data[i]['type']=='link')
                        { 
                          
                           str = '<h5> Link posted on  :'+nw_dt+ '</h5>'
                                     + '<p>'+postdata.posts.data[i].name+'</br>'
                                     +  '<a href="' + postdata.posts.data[i].link + '" target= "_blank">'+postdata.posts.data[i].link +'</a>'+'</p>'
                                     + '<hr/>';
                                     $("#newdata").append(str);

                        }
                          
                       // when post type is a photo
                       if(postdata.posts.data[i]['type']=='photo')
                        { 
                           
                              if (postdata.posts.data[i].hasOwnProperty('message'))
                              {

                                 str = '<h5> Photo posted on  :'+nw_dt+ '</h5>'
                                     + '<p>'+postdata.posts.data[i].message+'</br>'
                                     +  '<a href="' + postdata.posts.data[i].link + '" target= "_blank">view photo -></a></p>'
                                     + '<hr/>';
                                    $("#newdata").append(str);
                                     
                              }

                              if (postdata.posts.data[i].hasOwnProperty('story'))
                              {
                                 str = '<h5> Photo posted on  :'+nw_dt+ '</h5>'
                                     + '<p>'+postdata.posts.data[i].story+'</br>'
                                     +  '<a href="' + postdata.posts.data[i].link + '" target= "_blank">view photo -></a></p>'
                                     + '<hr/>';

                                     $("#newdata").append(str);                                   

                              }
                        }
                           


                }
                        
        }                 
      }
    }
  );
}









