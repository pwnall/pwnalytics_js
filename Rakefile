require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

# Output directory.
directory 'bin'

# Development binaries.
file 'bin/insert.js' => Dir['src/insert/*.js'].sort do
  Kernel.system 'cat src/insert/*.js > bin/insert.js'
end
file 'bin/p.js' => Dir['src/pwnalytics/*.js'].sort do
  Kernel.system 'cat src/pwnalytics/*.js > bin/p.js'
end

# Production binaries.
file 'bin/insert.min.js' => 'bin/insert.js' do
  Kernel.system 'juicer merge --force bin/insert.js'
end
file 'bin/p.min.js' => 'bin/p.js' do
  Kernel.system 'juicer merge --force bin/p.js'
end

# Build tasks.
task :build => ['bin/insert.min.js', 'bin/p.min.js']
task :default => [:build, "jasmine:ci"]
