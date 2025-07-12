// 学习笔记: 这是首页，也是主要的业务页面。
// 这里包含了表单、计算逻辑和结果展示，是项目的核心功能实现。

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calculator, User, Ruler, Scale, Activity, Flame } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue
  } = useForm();

  const calculateCalories = (data) => {
    const { age, gender, height, weight, activityLevel } = data;
    if (!age || !gender || !height || !weight || !activityLevel) {
      return {
        bmr: 0,
        tdee: 0,
        fatLossCalories: 0
      };
    }
    
    // 计算基础代谢率(BMR)
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // 计算每日能量消耗(TDEE)
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    const tdee = bmr * activityMultipliers[activityLevel];

    // 计算减脂能量消耗(减少15%)
    const fatLossCalories = tdee * 0.85;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      fatLossCalories: Math.round(fatLossCalories)
    };
  };

  const onSubmit = (data) => {
    const results = calculateCalories(data);
    alert(`基础代谢(BMR): ${results.bmr} 卡路里\n每日能量消耗(TDEE): ${results.tdee} 卡路里\n减脂能量摄入: ${results.fatLossCalories} 卡路里`);
  };

  // 使用 useMemo 优化计算，避免不必要的重复计算
  const age = watch("age");
  const gender = watch("gender");
  const height = watch("height");
  const weight = watch("weight");
  const activityLevel = watch("activityLevel");

  const results = React.useMemo(() => {
    return calculateCalories({
      age: age || 0,
      gender: gender || 'male',
      height: height || 0,
      weight: weight || 0,
      activityLevel: activityLevel || 'sedentary'
    });
  }, [age, gender, height, weight, activityLevel]);

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex gap-3 items-center">
              <Calculator className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-lg sm:text-xl">饮食热量计算器</CardTitle>
                <CardDescription className="text-sm">输入您的身体数据计算每日热量需求</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex gap-2 items-center">
                    <User className="w-4 h-4" />
                    年龄
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="请输入您的年龄"
                    {...register("age", { 
                      required: "请输入年龄",
                      min: { value: 1, message: "年龄不能小于1岁" },
                      max: { value: 120, message: "年龄不能超过120岁" }
                    })}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex gap-2 items-center">
                    <User className="w-4 h-4" />
                    性别
                  </Label>
                  <Select 
                    onValueChange={(value) => setValue("gender", value)}
                    defaultValue="male"
                    {...register("gender")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">男性</SelectItem>
                      <SelectItem value="female">女性</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="flex gap-2 items-center">
                    <Ruler className="w-4 h-4" />
                    身高 (厘米)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    min="100"
                    max="250"
                    placeholder="请输入您的身高"
                    {...register("height", { 
                      required: "请输入身高",
                      min: { value: 100, message: "身高不能小于100厘米" },
                      max: { value: 250, message: "身高不能超过250厘米" }
                    })}
                  />
                  {errors.height && (
                    <p className="text-sm text-red-500">{errors.height.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex gap-2 items-center">
                    <Scale className="w-4 h-4" />
                    体重 (公斤)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    min="30"
                    max="200"
                    placeholder="请输入您的体重"
                    {...register("weight", { 
                      required: "请输入体重",
                      min: { value: 30, message: "体重不能小于30公斤" },
                      max: { value: 200, message: "体重不能超过200公斤" }
                    })}
                  />
                  {errors.weight && (
                    <p className="text-sm text-red-500">{errors.weight.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel" className="flex gap-2 items-center">
                    <Activity className="w-4 h-4" />
                    活动水平
                  </Label>
                  <Select 
                    onValueChange={(value) => setValue("activityLevel", value)}
                    defaultValue="sedentary"
                    {...register("activityLevel")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择活动水平" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">久坐 (很少或没有运动)</SelectItem>
                      <SelectItem value="light">轻度活动 (每周1-3天轻度运动)</SelectItem>
                      <SelectItem value="moderate">中度活动 (每周3-5天中等强度运动)</SelectItem>
                      <SelectItem value="active">高度活动 (每周6-7天高强度运动)</SelectItem>
                      <SelectItem value="veryActive">极高活动 (体力劳动或每天高强度训练)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4">
                  <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <div className="flex gap-2 items-center text-blue-600">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium text-sm sm:text-base">基础代谢</span>
                    </div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold">{results.bmr} 卡路里</div>
                  </div>

                  <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                    <div className="flex gap-2 items-center text-green-600">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium text-sm sm:text-base">每日消耗</span>
                    </div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold">{results.tdee} 卡路里</div>
                  </div>

                  <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                    <div className="flex gap-2 items-center text-purple-600">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium text-sm sm:text-base">减脂摄入</span>
                    </div>
                    <div className="mt-2 text-xl sm:text-2xl font-bold">{results.fatLossCalories} 卡路里</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="flex-1">
                  计算热量
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => reset()}
                >
                  重置
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
