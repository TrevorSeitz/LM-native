// Copyright 2015-present 650 Industries. All rights reserved.

#import "AppDelegate.h"

#import <EXCore/EXModuleRegistry.h>
#import <EXReactNativeAdapter/EXNativeModulesProxy.h>
#import <EXReactNativeAdapter/EXModuleRegistryAdapter.h>

@implementation AppDelegate

// Put your app delegate methods here. Remember to also call methods from EXStandaloneAppDelegate superclass
// in order to keep Expo working. See example below.

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  self.moduleRegistryAdapter = [[EXModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[EXModuleRegistryProvider alloc] init]];

   RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  #ifdef DEBUG	  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"UnimodulePlayground" initialProperties:nil];
}

@end
