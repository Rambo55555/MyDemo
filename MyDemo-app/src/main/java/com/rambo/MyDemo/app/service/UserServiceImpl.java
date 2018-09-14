package com.rambo.MyDemo.app.service;



import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Service;

import com.rambo.MyDemo.app.dao.UserMapper;
import com.rambo.MyDemo.app.domain.User;
import com.rambo.MyDemo.app.domain.UserExample;
import com.rambo.MyDemo.app.domain.UserExample.Criteria;
import com.rambo.MyDemo.rpc.iservice.UserService;

@Service(interfaceClass=UserService.class)
@Component
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserMapper userMapper;
	
	public Object login(int userId, String password) {
		UserExample userExample = new UserExample();
		Criteria criteria = userExample.createCriteria();
		
			criteria.andIdEqualTo(userId);		
		if (StringUtils.isNotEmpty(password)) {
			criteria.andPasswordEqualTo(password);
		}
		List<User> userList = userMapper.selectByExample(userExample);
		if (userList.size() > 0) {
			User user = userList.get((0));
			com.rambo.MyDemo.rpc.dto.User dtoUser = new com.rambo.MyDemo.rpc.dto.User();
			BeanUtils.copyProperties(user, dtoUser);			
				return dtoUser;
			
		}
		return null;
	}

}
