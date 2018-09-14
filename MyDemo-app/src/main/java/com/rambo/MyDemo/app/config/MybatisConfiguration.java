package com.rambo.MyDemo.app.config;

import javax.annotation.PostConstruct;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class, MybatisAutoConfiguration.class })
@MapperScan(MybatisConfiguration.BASE_MAPPER_PACKAGE)
public class MybatisConfiguration {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	protected static final String BASE_MAPPER_PACKAGE = "com.rambo.MyDemo.app.dao";

	@PostConstruct
	public void init() {
		logger.info("加载" + BASE_MAPPER_PACKAGE + "路径下的Mapper");
	}

}
