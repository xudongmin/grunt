//包裝函數
module.exports = function(grunt) {

	//告訴grunt當我們在終端中輸入grunt時需要做些什麼 (注意先後順序)
	grunt.registerTask('default', []);

	//任務配置,所有插件的配置信息
	grunt.initConfig({

		//獲取 package.json 的信息
		pkg: grunt.file.readJSON('package.json'),

		//uglify 插件的配置信息
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build: {
				src: 'src/main.js',
				dest: 'build/main.min.js'
			}
		},
		// cssmin插件的配置信息
		cssmin: {
			options: {
				shorthandCompacting: false,
    			roundingPrecision: -1
			},
			target: {
				files: [
					{
						expand: true,
						cwd: 'css',
						src: ['*.css', '!*.min.css'],
						dest: 'css',
						ext: '.min.css'
					},
					{
						'output.css': ['css/style.css', 'css/jquery-confirm.css']
					},
					{
						'output2.css': ['css/abc.css', 'css/eeee.css']
					},
				]
			}
		},
		//jshint插件的配置信息
		jshint: {
			build: ['Gruntfile.js', 'src/abc.js'],
			opotions: {
				jshintrc: '.jshintrc'
			}
		},
		//csslint插件的配置信息
		csslint: {
			strict: {
			    options: {
			      import: 2
			    },
			    src: ['css/abc.css']
		  	},
			options: {
				csslintrc: '.csslintrc'
			}
		},
		//watch插件的配置信息
		watch: {
			build: {
				files: ['src/*.js', 'css/*.css'],
				tasks: ['jshint','csslint','uglify','cssmin'],
				options: { spawn: false }
			}
		}
	});

	//告訴grunt我們將使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//告訴grunt當我們在終端輸入grunt時需要做些什麼(注意先後順序)
	grunt.registerTask('default', ['jshint','csslint','uglify','cssmin','watch']);
};

