package com.rambo.MyDemo.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;
import com.rambo.MyDemo.web.DemoWebApplication;

@SpringBootApplication
@EnableDubboConfiguration
@EnableCaching
@ServletComponentScan
public class DemoWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoWebApplication.class, args);
	}

}