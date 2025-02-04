"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Timer, Coins, ArrowDownToLine, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TokenFaucet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [claimAmount, setClaimAmount] = useState(10);
  const [cooldown, setCooldown] = useState(3600); // 1 hour in seconds
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-lg border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Coins className="w-12 h-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-pink-500 text-transparent bg-clip-text">
            WAGMI Token Faucet
          </CardTitle>
          <CardDescription className="text-slate-400">
            Claim your WAG tokens every hour
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Claim amount:</span>
              <div className="flex items-center gap-2">
                <Input 
                  type="number"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(Number(e.target.value))}
                  className="w-24 bg-slate-700 border-slate-600"
                  min="1"
                />
                <Badge variant="secondary">WAG</Badge>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Cooldown:</span>
              <div className="flex items-center gap-2 text-white">
                <Timer className="w-4 h-4" />
                <span>{Math.floor(cooldown / 3600)}h {Math.floor((cooldown % 3600) / 60)}m</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Time until next claim</span>
              <span>45:30</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="admin" className="border-slate-700">
              <AccordionTrigger className="text-slate-200 hover:text-slate-100">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Admin Controls
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Set Cooldown Period</label>
                    <div className="flex gap-4">
                      <Slider
                        value={[cooldown]}
                        onValueChange={(value) => setCooldown(value[0])}
                        min={30}
                        max={86400}
                        step={30}
                        className="flex-1"
                      />
                      <span className="text-sm text-slate-400 w-20">
                        {Math.floor(cooldown / 3600)}h {Math.floor((cooldown % 3600) / 60)}m
                      </span>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        // Handle setCooldown
                      }}
                    >
                      Update Cooldown
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600"
            size="lg"
            disabled={isLoading}
            onClick={() => setIsLoading(true)}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Claiming {claimAmount} WAG...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ArrowDownToLine className="w-4 h-4" />
                Claim {claimAmount} WAG
              </div>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TokenFaucet;