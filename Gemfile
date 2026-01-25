# Gemfile per GitHub Pages

source "https://rubygems.org"

# GitHub Pages gem (include tutte le dipendenze corrette)
gem "github-pages", group: :jekyll_plugins

# Plugin opzionali (già inclusi in github-pages ma specificati per chiarezza)
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Windows compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
