package com.rambo.MyDemo.web.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.rambo.MyDemo.rpc.dto.User;
import com.rambo.MyDemo.rpc.iservice.UserService;

@RestController
public class LoginController {

	@Reference
	private UserService userService;
	
	@RequestMapping(value = "/login",method = RequestMethod.POST)
	public Map<String, String> adminlogin(HttpServletRequest request, User user) throws Exception {
		
		User user1 = (User) userService.login(user.getId(), user.getPassword());
		Map<String, String> map = new HashMap<String, String>();
		if (user1 != null) {
			HttpSession session = request.getSession(true);
			session.setAttribute("user", user1);
			map.put("message", "success");
			map.put("name", user1.getName());
			
		} else {
			map.put("message", "fail");
		}
		return map;
	}
	
    @RequestMapping(value="/checkUser",method = RequestMethod.POST)
    public String checkUser(HttpServletRequest request,HttpServletResponse response){
        //编码规范
        response.setContentType("text/html;charset=utf-8");
        response.setCharacterEncoding("utf-8");
        //获取session值
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        System.out.println(user.getName());
        return user.getName();
       
    }

}
