#!/bin/bash

# 创建images目录
mkdir -p images

# 下载DNF相关图片
# 背景图 - 使用DNF主城场景
curl "https://img.tapimg.com/market/images/1b034d6ade3f7a7b4333f7e150d48e0f.jpg" -o images/banner.jpg

# 角色图片
# 鬼剑士
curl "https://img.tapimg.com/market/images/c8b34591e8b6ba975aa2f219db17a3cc.jpg" -o images/swordmaster.jpg

# 魔法师
curl "https://img.tapimg.com/market/images/d1c7e2d9a3f3e8c8d6c8b8a7f2e1d0c9.jpg" -o images/mage.jpg

# 神枪手
curl "https://img.tapimg.com/market/images/e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7.jpg" -o images/gunner.jpg

# 圣职者
curl "https://img.tapimg.com/market/images/f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8.jpg" -o images/priest.jpg

# 活动图片
curl "https://img.tapimg.com/market/images/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.jpg" -o images/activity1.jpg
curl "https://img.tapimg.com/market/images/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7.jpg" -o images/activity2.jpg
curl "https://img.tapimg.com/market/images/c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8.jpg" -o images/activity3.jpg

# 检查下载是否成功并设置默认图片
for img in banner swordmaster mage gunner priest activity1 activity2 activity3; do
  if [ -f "images/${img}.jpeg" ]; then
    echo "${img}.jpeg 已存在"
  else
    echo "警告: ${img}.jpeg 不存在"
    if [ ! -s images/${img}.jpg ]; then
      echo "警告: ${img}.jpg 下载失败或文件为空，使用默认图片"
      # 复制默认图片
      cp default/${img}.jpg images/${img}.jpg 2>/dev/null || {
        echo "错误: 无法找到默认图片 ${img}.jpg"
        # 创建一个简单的占位图片
        convert -size 800x600 xc:gray -pointsize 40 -gravity center -draw "text 0,0 'DNF ${img}'" images/${img}.jpg 2>/dev/null || {
          echo "错误: 无法创建占位图片 ${img}.jpg"
        }
      }
    else
      echo "${img}.jpg 下载成功"
    fi
  fi
done
