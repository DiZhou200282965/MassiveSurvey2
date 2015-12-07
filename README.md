# MassiveSurvey2
// Unofficial readme

Home	|		login	| 		 Register |  	do survey 
（登陆才有）             userInfo		|		MySurvey	| 	logout 	
							
Surveys | Manage MY Survey(s) | Survey Result


	
Home： 首页显示  所有问卷列表（包括谁创建，过期状态，有多少题，问卷方向）

userInfo： 
•	编辑用户自己的资料，比如 密码，登录名，用户昵称，用户头像等。
•	显示自己所有的survey 信息： timeOfCreation， numOfQuestion
MySurvey：
Surveys： 显示该用户现有的所有survey ， 参考todo list
Manage MY Survey(s)：  可以添加各种各样的题型
Survey Result： 统计 ，待定
    ---------------------------------------------------------
题型				内容     			             				                            	   
两项选择twoOption         		                    黑或白
Multiple choice                         多选1
Short answer                            自己的见解
Check box                               多选多（单）
排序题      （option）                   排序
Scale	（option）                      对一件事物的喜欢程度
------------------------------------------------------------------------------
Schema
{	
    name: String,
    category: String,
    completed: Boolean,
    username: String,
    twoOption:
    [{
        option1: String,
        option2: String
    }],
    multipleChoice:
    [{          
       mcQuestion: String,
       mcAnswers: [String]
    }],
    shortAnswer: [String],
    checkBox:
    [{
        cbQuestion: String,
        cbAnswers: [String]
    }],
    rank:
    [{
        rankQuestion: String,
        rankAnswers: [String]
    }],
    scaleQuestion: [String],
    updated_at: {type:Date, default: Date.now}
}

External Documentation For Massive Survey

Welcome to Massive Survey! We are building a website which will allow users to create and take surveys online. This is the logo.
So basically, Massive Survey will include 6 pages. When users type the root URL, the browser will bring them to the homepage. The homepage is the most important page which shows all the functions of our website. On top of the that, a navbar tells users where to go and there are actually URLs to other pages. And the major part of our website will be a list of public surveys. Users can see the author, theme, valid time, and number of questions of surveys. And if you are interested in one of them, you can just click the name then the browser will bring you to the do-survey page, there you can look through or take the survey.
If you want to create a survey of your own, you need to log in at first,(you can find a title in the navbar, it will take you to the log in page) and then you can see “Create Survey”, click that and you come to the create-survey page now. Here we offer several question templates which are multiple choice, short answer, sort, etc. Click the buttons aside to add a template, and you can edit question contents there. If an anonymous user or a user hasn’t log in try to create a survey, they will be brought to the log in page. People don’t have an account can register to get one.
The last page will be user info page. After log in, users can check or modify their information there, such as user name, password, etc. Another thing is they can CURD and publish the surveys they created. Hopefully, there can be something showing survey results in a specific one. So user can collect that data and get useful conclusions.(We are trying to make some statistical approaches such as percentage of every choice which can help users collect data.) Above is the main functions of our survey site.
Table of Contents:
-------------------------------------------------------------------------------------------------------
Homepage：
	A list of public surveys(creator, valid time, number of questions,theme)User Info： 
	Edit information, such as user name, password, profile,etc.	Survey Info showing information of created survey, users can CURD and 	publish.Create Survey：
	Offer templates, CURD to make surveys
Survey Result： 
	Statistical approaches, TBD.
Log in and Register:
	As the title.
-------------------------------------------------------------------------------------------------------
Question type				Comment 
-------------------------------------------------------------------------------------------------------	                
Multiple choice               creator can decide number of choice
Short answer                 textbox template to get brief answer
Check box                   user can check multiple choices
Sort                  	     sort several choices according to a specific factor
Scale	
-------------------------------------------------------------------------------------------------------