package com.rambo.MyDemo.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.alibaba.dubbo.spring.boot.annotation.EnableDubboConfiguration;

@SpringBootApplication
@EnableDubboConfiguration
@EnableCaching
@EnableTransactionManagement
public class MyDemoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyDemoAppApplication.class, args);
	}
}
